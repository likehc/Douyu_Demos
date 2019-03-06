import time
from barrage_info import *
class BRRAGE_FUC(object):
    '''  常被调用的静态方法  '''

    #提取发言弹幕
    @staticmethod
    def get_chatmsg(msg):
        brrage_msg =Brrage_Msg()
        #获取当时时间 eg: '2019-02-16 18:50:02'
        brrage_msg.time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        key_value_list =  msg.split("/")
        for key_value_temp in key_value_list:
            key_value=key_value_temp.split("@=",1)
            if len(key_value)==2:
                if key_value[0]=="rid":
                    brrage_msg.rid =str(key_value[1])
                elif key_value[0]=="uid":
                    brrage_msg.uid =str(key_value[1])
                elif key_value[0]=="nn":
                    brrage_msg.nn =str(key_value[1])
                elif key_value[0]=="txt":
                    brrage_msg.txt=str(key_value[1])
                elif key_value[0]=="cid":
                    brrage_msg.cid =str(key_value[1])
                elif key_value[0]=="nl":
                    brrage_msg.nl =str(key_value[1])
                elif key_value[0]=="level":
                    brrage_msg.level =str(key_value[1])
                elif key_value[0]=="bnn":
                    brrage_msg.bnn =str(key_value[1])
                elif key_value[0]=="bl":
                    brrage_msg.bl =str(key_value[1])
                elif key_value[0]=="brid":
                    brrage_msg.brid =str(key_value[1])
        return brrage_msg

    #提取送礼物弹幕
    @staticmethod
    def get_Dbg(msg):
        brrage_dgb = Brrage_Dgb()
        # 获取当时时间 eg: '2019-02-16 18:50:02'
        brrage_dgb.time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        key_value_list = msg.split("/")
        for key_value_temp in key_value_list:
            key_value = key_value_temp.split("@=",1)
            if len(key_value) == 2:
                if key_value[0] == "rid":
                    brrage_dgb.rid = key_value[1]
                elif key_value[0] == "uid":
                    brrage_dgb.uid = key_value[1]
                elif key_value[0] == "nn":
                    brrage_dgb.nn = key_value[1]
                elif key_value[0] == "sn":
                    brrage_dgb.sn = key_value[1]
                elif key_value[0] == "gfid":
                    brrage_dgb.gfid = key_value[1]
                elif key_value[0] == "gfcnt":
                    brrage_dgb.gfcnt = key_value[1]
                elif key_value[0] == "hits":
                    brrage_dgb.hits = key_value[1]
        return brrage_dgb


    #提取用户进房通知弹幕
    @staticmethod
    def get_uenter(msg):
        brrage_enter = Brrage_Enter()
        key_value_list = msg.split("/")
        for key_value_temp in key_value_list:
            key_value = key_value_temp.split("@=",1)
            if len(key_value) == 2:
                if key_value[0] == "rid":
                    brrage_enter.rid = key_value[1]
                if key_value[0] == "uid":
                    brrage_enter.uid = key_value[1]
                if key_value[0] == "nn":
                    brrage_enter.nn = key_value[1]
                if key_value[0] == "nl":
                    brrage_enter.nl = key_value[1]
        return brrage_enter

    #飞机、火箭 广播消息
    @staticmethod
    def get_spbc(msg):
        brrage_spbc = Brrage_Spbc()
        key_value_list = msg.split("/")
        for key_value_temp in key_value_list:
            key_value = key_value_temp.split("@=",1)
            if len(key_value) == 2:
                if key_value[0] == "rid":
                    brrage_spbc.id = key_value[1]
                if key_value[0] == "drid":
                    brrage_spbc.drid = key_value[1]
                if key_value[0] == "uid":
                    brrage_spbc.uid = key_value[1]
                if key_value[0] == "sn":
                    brrage_spbc.sn = key_value[1]
                if key_value[0] == "dn":
                    brrage_spbc.dn = key_value[1]
                if key_value[0] == "gn":
                    brrage_spbc.gn = key_value[1]
                if key_value[0] == "gc":
                    brrage_spbc.gc = key_value[1]
                if key_value[0] == "gb":
                    brrage_spbc.gb = key_value[1]
                if key_value[0] == "gfid":
                    brrage_spbc.gfid = key_value[1]
        return brrage_spbc