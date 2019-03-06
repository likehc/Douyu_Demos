using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;

namespace danmu
{
    class Program
    {
        private static string SERVER_DOMAIN = "openbarrage.douyutv.com";
        private static int SERVER_PORT = 8601;
        private static int ROOM_ID = 288016;
        private static string FIX_TAIL = String.Empty;  //拼接处理后被丢弃的数据，防止弹幕丢失
        class BrrageMsg
        {
            public string Name = String.Empty;
            public string Txt = String.Empty;
        }
        static void Main(string[] args)
        {
            try
            {
                Socket tcpClient = InitTcp(SERVER_DOMAIN, SERVER_PORT);
                Thread getDanmuThread = new Thread(GetDanmu);
                getDanmuThread.Start(tcpClient);
                Thread keepAliveThread = new Thread(KeepAlive);
                keepAliveThread.Start(tcpClient);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        static Socket InitTcp(string host, int port)
        {
            IPHostEntry hostInfo = Dns.GetHostEntry(host);
            IPAddress ipAddress = hostInfo.AddressList[0]; //域名转IP
            IPEndPoint ipe = new IPEndPoint(ipAddress, port);
            Socket s = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            s.Connect(ipe);
            return s;
        }
        static byte[] DataToBytes(string data)
        {
            string dantaNew = data + "\0";
            byte[] bodyDataByte = Encoding.UTF8.GetBytes(dantaNew);
            byte[] cType = BitConverter.GetBytes(689);

            int dataLength = dantaNew.Length + cType.Length + 8;
            byte[] dataLengthByte = BitConverter.GetBytes(dataLength);
            byte[] dataLengthByte2 = BitConverter.GetBytes(dataLength);
            byte[] result = new byte[dataLength + 4];

            Array.Copy(dataLengthByte, 0, result, 0, 4);
            Array.Copy(dataLengthByte2, 0, result, 4, 4);
            Array.Copy(cType, 0, result, 8, 4);
            Array.Copy(bodyDataByte, 0, result, 12, bodyDataByte.Length);
            byte[] source = new byte[result.Length];
            Array.Copy(result, 0, source, 0, result.Length);
            return result;
        }

        static void GetDanmu(object obj)
        {
            Socket tcpClient = (Socket)obj;
            string login = "type@=loginreq/roomid@=" + ROOM_ID + "/";
            byte[] loginBytes = DataToBytes(login);
            tcpClient.Send(loginBytes);
            string joingroup = "type@=joingroup/rid@=" + ROOM_ID + "/gid@=-9999/";
            byte[] joingroupBytes = DataToBytes(joingroup);
            tcpClient.Send(joingroupBytes);
            string recvStr = "";
            byte[] recvBytes = new byte[1024];
            int bytes;
            while (true)
            {
                bytes = tcpClient.Receive(recvBytes, recvBytes.Length, 0);//从服务器端接受返回信息
                recvStr = Encoding.UTF8.GetString(recvBytes, 0, bytes);
                ShowMsg(recvStr);
            }
        }

        static BrrageMsg GetMsgType(string[] msgType)
        {
            BrrageMsg brrageMsg = new BrrageMsg();
            foreach (string keyValueTemp in msgType)
            {
                string[] keyValue = Regex.Split(keyValueTemp, "@=", RegexOptions.IgnoreCase);
                if (keyValue.Length >= 2)
                {
                    string key = keyValue[0];
                    string[] textArr = new string[keyValue.Length - 1];
                    Array.Copy(keyValue, 1, textArr, 0, keyValue.Length - 1);
                    string value = String.Join("@", textArr);
                    if (key =="nn")
                    {
                        brrageMsg.Name = value;
                    }
                    if ((key == "txt"))
                    {
                        brrageMsg.Txt = value;
                    }
                }
            }
            return brrageMsg;
        }
        static void ShowMsg(string msg)
        {
            msg = FIX_TAIL + msg;
            string[] chatmsgArray = Regex.Split(msg, "type@=", RegexOptions.IgnoreCase);
            FIX_TAIL = chatmsgArray[chatmsgArray.Length - 1];   //截取最后的丢弃数据，放在下个包的开头，防止数据丢失
            string[] newChatmsgArrayArr = new string[chatmsgArray.Length - 1];
            Array.Copy(chatmsgArray, 0, newChatmsgArrayArr, 0, chatmsgArray.Length - 1);

            foreach (string t in newChatmsgArrayArr)
            {
                string[] msgType = t.Split('/');
                if (msgType.Length >= 2)
                {
                    string type = msgType[0];
                    if (type == "chatmsg")
                    {
                        BrrageMsg brrageMsg=GetMsgType(msgType);
                        string result = String.Format("[{0}]: {1}", brrageMsg.Name, brrageMsg.Txt);
                        Console.WriteLine(result);
                    }
                }
            }
        }
        static void KeepAlive(object obj)
        {
            Socket tcpClient = (Socket)obj;
            byte[] aliveMsg = DataToBytes("type@=mrkl/");
            while (true)
            {
                tcpClient.Send(aliveMsg);
                Thread.Sleep(40000);
            }
        }
    }
}
