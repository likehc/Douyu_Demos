class Brrage_Base(object):
    rid = "0"  # 房间号
    uid = "0"  # 用户id
    nn = "nn"  # 用户昵称
    time = "0000-00-00 00:00:00"  # 时间

class Brrage_Msg(Brrage_Base):
    """表示为“弹幕”消息，type固定为 chatmsg"""
    def __init__(self):
        self.txt="txt"  #弹幕文本内容
        self.cid=""   #弹幕唯一 ID
        self.nl=0   #贵族等级
        self.level =0   #用户等级
        self.bnn = ""  # 徽章昵称
        self.bl = 0  # 徽章等级
        self.brid=0   #徽章房间 id

class Brrage_Dgb(Brrage_Base):
    '''表示为“赠送礼物”消息，type固定为 dgb '''
    def __init__(self):

        self.gfid=0      #礼物 id
        self.gfcnt =1 #礼物个数：默认值 1
        self.hits=1   #礼物连击次数：默认值 1（表示 1 连击）

class Brrage_Enter(Brrage_Base):
    ''' 表示为“用户进房通知”消息，type固定为 uenter '''
    def __init__(self):
        self.nl = 0  # 贵族等级

class Brrage_Spbc(Brrage_Base):
    ''' 房间内礼物广播，type固定为 spbc'''
    def __init__(self):
        self.drid = 0  #赠送房间 rid ，默认为0
        self.sn = ""  # 赠送者昵称
        self.dn = ""  # 受赠者昵称
        self.gn = ""  # 礼物名称
        self.gc = 1  # 礼物数量
        # self.gs = ""  # 广播样式
        self.gb = 1  # 是否有礼包（0-无礼包，1-有礼包）
        # self.es = 1  # 广播展现样式（1-火箭，2-飞机）
        self.gfid = 1  #礼物 id
