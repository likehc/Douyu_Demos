import socket
import time
import threading
import multiprocessing
from barrage_func import * #  导入自定义方法

SERVER_DOMAIN = "openbarrage.douyutv.com"  # 弹幕服务器 域名
SERVER_PORT = 8601;  # 弹幕服务器 端口
ROOM_ID = 288016;   #房间ID

global FIX_TAIL #拼接处理后被丢弃的数据，防止弹幕丢失
FIX_TAIL = ""
global gl_client #全局socket
gl_client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

def init_socket():
    global gl_client
    host_ip = socket.gethostbyname(SERVER_DOMAIN)
    gl_client.connect((host_ip, SERVER_PORT))
def sendDate(client,data):
    data = data + '\0'   #斗鱼独创序列化文本数据，结尾必须为'\0'
    data_length = length = len(data)+8  #斗鱼协议在尾部加了 消长度4字节，消息类型2字节(689)，加密字段1字节，保留字段1字节，
    code = 689  # 消息类型
    # 消息头部：消息长度+消息类型+加密字段(默认为0)+保留字段(默认为0)
    head = data_length.to_bytes(4, 'little') + data_length.to_bytes(4, 'little') + code.to_bytes(2,'little')+ (0).to_bytes(2,'little')
    # head = int.to_bytes(data_length, 4, 'little') + int.to_bytes(data_length, 4, 'little') + int.to_bytes(code, 4,'little')
    client.sendall(head) # 发送头部部分
    msg = (data).encode('utf-8')  # 使用utf-8编码 数据部分
    client.sendall(bytes(msg))   # 发送数据部分

def getdanmu(client):
    login = 'type@=loginreq/roomid@=%s/' % ROOM_ID
    sendDate(client,login)
    joingroup = 'type@=joingroup/rid@=%s/gid@=-9999/' % ROOM_ID
    sendDate(client,joingroup)
    while True:
        try:
            part_body = client.recv(1024,socket.MSG_WAITALL)
            if not part_body:   #如果 服务器发送终止连接b''，则终止会话
                break
            msg_str = part_body.decode(encoding="utf-8", errors="ignore")
            get_type(msg_str)

        except Exception as e:
            print("getdanmu未知错误: %s" % e)
            continue

def get_type(msg_str):
    global FIX_TAIL
    msg_str = FIX_TAIL + msg_str
    msg_arr = msg_str.split("type@=")
    FIX_TAIL = msg_arr.pop()
    for value in msg_arr:
        type_temp = value.split("/")
        if len(type_temp) >= 2:
            type_name = type_temp[0]
            if type_name == "chatmsg":
                chatmsg =BRRAGE_FUC.get_chatmsg(value)  #获取弹幕类
                print("["+chatmsg.nn+"]: "+chatmsg.txt)
                # pass
            elif type_name == "dgb":
                dgb = BRRAGE_FUC.get_Dbg(value)  #获取礼物类
                print("感谢[{}] ,赠送的 {} 个 '{}'".format(dgb.nn,int(dgb.gfcnt) * int(dgb.hits),dgb.gfid))
                # pass
            elif type_name == "uenter":
                uenter=BRRAGE_FUC.get_uenter(value)  #获取进入房间类
                print("欢迎 ["+ uenter.nn+"] " + "进入直播间")
                # pass
            elif type_name == "spbc":
                spbc = BRRAGE_FUC.get_spbc(value)  # 获取房间广播类
                print("{} 房间,[{}]赠送给[{}] {} 个 '{}'".format(spbc.drid,spbc.sn,spbc.dn,spbc.gc, spbc.gn))

def keep_alive(client):
    ''' 客户端每隔 45 秒发送心跳信息给弹幕服务器 '''
    while True:
        alive_msg = "type@=mrkl/"  #新版本
        # alive_msg = "type@=keeplive/tick@=%s/" % int(time.time())  #旧版本
        sendDate(client,alive_msg)
        time.sleep(20)

if __name__ == '__main__':
    init_socket()
    p1 = multiprocessing.Process(target=getdanmu, args=(gl_client,))
    p2 = multiprocessing.Process(target=keep_alive, args=(gl_client,))
    p1.start()
    p2.start()

