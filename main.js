try{
  //GameMgr.Inst.onFatalError=function(){}
  //GameMgr.Inst.onXiangGongError=function(){}
  //GameMgr.Inst.onNicknameError=function(){}
  //GameMgr.Inst.onLiujuError=function(){}
  GameMgr.inRelease=0;
}catch(e){}
function md5(string){
  function md5_RotateLeft(lValue,iShiftBits){
    return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));
  }
  function md5_AddUnsigned(lX,lY){
    var lX4,lY4,lX8,lY8,lResult;
    lX8=(lX&0x80000000);
    lY8=(lY&0x80000000);
    lX4=(lX&0x40000000);
    lY4=(lY&0x40000000);
    lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);
    if(lX4&lY4)return(lResult^0x80000000^lX8^lY8);
    if(lX4|lY4){
      if(lResult&0x40000000)return(lResult^0xC0000000^lX8^lY8);
      else return(lResult^0x40000000^lX8^lY8);
    }
    else return(lResult^lX8^lY8);
  }
  function md5_F(x,y,z){
    return(x&y)|((~x)&z);
  }
  function md5_G(x,y,z){
    return(x&z)|(y&(~z));
  }
  function md5_H(x,y,z){
    return(x^y^z);
  }
  function md5_I(x,y,z){
    return(y^(x|(~z)));
  }
  function md5_FF(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_F(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_GG(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_G(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_HH(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_H(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_II(a,b,c,d,x,s,ac){
    a=md5_AddUnsigned(a,md5_AddUnsigned(md5_AddUnsigned(md5_I(b,c,d),x),ac));
    return md5_AddUnsigned(md5_RotateLeft(a,s),b);
  };
  function md5_ConvertToWordArray(string){
    var lWordCount;
    var lMessageLength=string.length;
    var lNumberOfWords_temp1=lMessageLength+8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;
    var lNumberOfWords=(lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition=0;
    var lByteCount=0;
    while(lByteCount<lMessageLength){
      lWordCount=(lByteCount-(lByteCount%4))/4;
      lBytePosition=(lByteCount%4)*8;
      lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount=(lByteCount-(lByteCount%4))/4;
    lBytePosition=(lByteCount%4)*8;
    lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2]=lMessageLength<<3;
    lWordArray[lNumberOfWords-1]=lMessageLength>>>29;
    return lWordArray;
  };
  function md5_WordToHex(lValue){
    var WordToHexValue="",
    WordToHexValue_temp="",
    lByte,lCount;
    for(lCount=0;lCount<=3;lCount++){
      lByte=(lValue>>>(lCount*8))&255;
      WordToHexValue_temp="0"+lByte.toString(16);
      WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };
  function md5_Utf8Encode(string){
    string=string.replace(/\r\n/g,"\n");
    var utftext="";
    for(var n=0;n<string.length;n++){
      var c=string.charCodeAt(n);
      if(c<128)utftext+=String.fromCharCode(c);
      else if((c>127)&&(c<2048)){
        utftext+=String.fromCharCode((c>>6)|192);
        utftext+=String.fromCharCode((c&63)|128);
      }else{
        utftext+=String.fromCharCode((c>>12)|224);
        utftext+=String.fromCharCode(((c>>6)&63)|128);
        utftext+=String.fromCharCode((c&63)|128);
      }
    }
    return utftext;
  };
  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7,
  S12=12,
  S13=17,
  S14=22;
  var S21=5,
  S22=9,
  S23=14,
  S24=20;
  var S31=4,
  S32=11,
  S33=16,
  S34=23;
  var S41=6,
  S42=10,
  S43=15,
  S44=21;
  string=md5_Utf8Encode(string);
  x=md5_ConvertToWordArray(string);
  a=0x67452301;
  b=0xEFCDAB89;
  c=0x98BADCFE;
  d=0x10325476;
  for(k=0;k<x.length;k+=16){
    AA=a;
    BB=b;
    CC=c;
    DD=d;
    a=md5_FF(a,b,c,d,x[k+0],S11,0xD76AA478);
    d=md5_FF(d,a,b,c,x[k+1],S12,0xE8C7B756);
    c=md5_FF(c,d,a,b,x[k+2],S13,0x242070DB);
    b=md5_FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);
    a=md5_FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);
    d=md5_FF(d,a,b,c,x[k+5],S12,0x4787C62A);
    c=md5_FF(c,d,a,b,x[k+6],S13,0xA8304613);
    b=md5_FF(b,c,d,a,x[k+7],S14,0xFD469501);
    a=md5_FF(a,b,c,d,x[k+8],S11,0x698098D8);
    d=md5_FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);
    c=md5_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=md5_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=md5_FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=md5_FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=md5_FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=md5_FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=md5_GG(a,b,c,d,x[k+1],S21,0xF61E2562);
    d=md5_GG(d,a,b,c,x[k+6],S22,0xC040B340);
    c=md5_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=md5_GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);
    a=md5_GG(a,b,c,d,x[k+5],S21,0xD62F105D);
    d=md5_GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=md5_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=md5_GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);
    a=md5_GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);
    d=md5_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=md5_GG(c,d,a,b,x[k+3],S23,0xF4D50D87);
    b=md5_GG(b,c,d,a,x[k+8],S24,0x455A14ED);
    a=md5_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=md5_GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);
    c=md5_GG(c,d,a,b,x[k+7],S23,0x676F02D9);
    b=md5_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=md5_HH(a,b,c,d,x[k+5],S31,0xFFFA3942);
    d=md5_HH(d,a,b,c,x[k+8],S32,0x8771F681);
    c=md5_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=md5_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=md5_HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);
    d=md5_HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);
    c=md5_HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);
    b=md5_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=md5_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=md5_HH(d,a,b,c,x[k+0],S32,0xEAA127FA);
    c=md5_HH(c,d,a,b,x[k+3],S33,0xD4EF3085);
    b=md5_HH(b,c,d,a,x[k+6],S34,0x4881D05);
    a=md5_HH(a,b,c,d,x[k+9],S31,0xD9D4D039);
    d=md5_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=md5_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=md5_HH(b,c,d,a,x[k+2],S34,0xC4AC5665);
    a=md5_II(a,b,c,d,x[k+0],S41,0xF4292244);
    d=md5_II(d,a,b,c,x[k+7],S42,0x432AFF97);
    c=md5_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=md5_II(b,c,d,a,x[k+5],S44,0xFC93A039);
    a=md5_II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=md5_II(d,a,b,c,x[k+3],S42,0x8F0CCC92);
    c=md5_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=md5_II(b,c,d,a,x[k+1],S44,0x85845DD1);
    a=md5_II(a,b,c,d,x[k+8],S41,0x6FA87E4F);
    d=md5_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=md5_II(c,d,a,b,x[k+6],S43,0xA3014314);
    b=md5_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=md5_II(a,b,c,d,x[k+4],S41,0xF7537E82);
    d=md5_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=md5_II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);
    b=md5_II(b,c,d,a,x[k+9],S44,0xEB86D391);
    a=md5_AddUnsigned(a,AA);
    b=md5_AddUnsigned(b,BB);
    c=md5_AddUnsigned(c,CC);
    d=md5_AddUnsigned(d,DD);
  }
  return(md5_WordToHex(a)+md5_WordToHex(b)+md5_WordToHex(c)+md5_WordToHex(d)).toLowerCase();
}
var initData,initRoom,show;
//uiscript.UI_ScoreChange.prototype.setBaopai=function(){}
function editgame(editdata){
  try{
    let UI_Replay=uiscript.UI_Replay.Inst;
    let rounds=[];
    for(let i=0;i<editdata.actions.length;i++){
      let whatever={
        'actions':editdata.actions[i],
        'xun':[]
      }
      try{
        whatever.xun=editdata.xun[i][view.DesktopMgr.Inst.seat];
      }catch(e){
        //throw(e);
        whatever.xun=editdata.xun[i][0];
      }
      rounds.push(whatever);
    }
    UI_Replay.rounds=rounds;
    UI_Replay.gameResult.result.players=editdata.players;
  }catch(e){
    throw(e);
  }
}
function edit(x){
  try{
    if(initData==undefined)initData=uiscript.UI_Replay.prototype.initData;
    if(initRoom==undefined)initRoom=view.DesktopMgr.prototype.initRoom;
    if(show==undefined)show=uiscript.UI_GameEnd.prototype.show;
    try{editfunction();}catch(e){};
    function player_datas(a){
      let ret=[];
      for(let seat=0;seat<x.player_datas.length;seat++){
        ret[seat]={
          'nickname':x.player_datas[seat].nickname,
          'avatar_id':x.player_datas[seat].avatar_id,
          'avatar_frame':x.player_datas[seat].avatar_frame,
          'character':{
            'is_upgraded':true,
            'level':5,
            'charid':cfg.item_definition.skin.map_[x.player_datas[seat].avatar_id].character_id,
            'skin':x.player_datas[seat].avatar_id,
          },
          'level':{'id':10101},
          'level3':{'id':20101},
          'charid':cfg.item_definition.skin.map_[x.player_datas[seat].avatar_id].character_id,
          'seat':seat,
          'views':x.player_datas[seat].views,
          'title':x.player_datas[seat].title,
        }
        if(a[seat].account_id!=undefined)ret[seat].account_id=a[seat].account_id;
      }
      return ret;
    }
    if(x==undefined)x=JSON.parse(JSON.stringify(editdata));
    uiscript.UI_Replay.prototype.initData=function(t){
      let _=initData.call(this,t);
      try{editfunction2();}catch(e){};
      editgame(x);
      return _;
    }
    view.DesktopMgr.prototype.initRoom=function(e,a,s,o,l){
      if(o==1)initRoom.call(this,x.config,player_datas(a),s,o,l);
      else initRoom.call(this,e,a,s,o,l);
      try{editfunction2();}catch(e){};
      if(o==1&&x.config.mode.mode>20)view.DesktopMgr.Inst.rule_mode=view.ERuleMode.Liqi2;
    }
    //console.log("edit successfully");
  }catch(e){};
}
function canceledit(){
  uiscript.UI_Replay.prototype.initData=function(t){
    return initData.call(this,t);
  }
  view.DesktopMgr.prototype.initRoom=function(e,a,s,o,l){
    return initRoom.call(this,e,a,s,o,l);
  }
}
var scores=[25000,25000,25000,25000],tiles0=null,tiles1=null,tiles2=null,tiles3=null,firstneededscores=null;
var baopai=null,liqibang=0,lstliqi=null,doracnt=null,playertiles=null,fulu=null,paihe=null,muyu={'count':5,'seat':0,'id':0};
var liqiinfo=null,drawtype=null,lstdrawtype=null,doras=null,li_doras=null,delta_scores=null,muyutimes=null,muyuseats=null,mingpais=[{},{},{},{}];
var chang=0,ju=0,ben=0,playercnt=null,actions=[],xun=[],players=[],benchangbang=null,chuanmagangs=null;
var config=null,hules_history=null,hupaied=null,paishan=null,discardtiles=["","","",""],gaps=null,juc=-1;
var specialtiles={
  'all':separatetile("0123456789m0123456789p0123456789s1234567z"),
  'lvyise':separatetile("0123456789m0123456789p01579s123457z"),
  'ziyise':separatetile("0123456789m0123456789p0123456789s"),
  'qinglaotou':separatetile("02345678m02345678p02345678s1234567z"),
  'duanyaojiu':separatetile("19m19p19s1234567z"),
  'hunlaotou':separatetile("02345678m02345678p02345678s"),
  'guoshiwushuang':separatetile("02345678m02345678p02345678s"),
  'qingyise_man':separatetile("0123456789p0123456789s1234567z"),
  'qingyise_pin':separatetile("0123456789m0123456789s1234567z"),
  'qingyise_sou':separatetile("0123456789m0123456789p1234567z"),
  'hunyise_man':separatetile("0123456789p0123456789s"),
  'hunyise_pin':separatetile("0123456789m0123456789s"),
  'hunyise_sou':separatetile("0123456789m0123456789p"),
}
var settings={};
var editdata={
  'actions':[],
  'xun':[],
  'players':[],
  'config':{},
  'player_datas':[{'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                  {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                  {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                  {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]}]
};
var lstscene;
function saveproject(){
  let tmp={};
  tmp.scores=JSON.parse(JSON.stringify(scores));
  tmp.tiles0=JSON.parse(JSON.stringify(tiles0));
  tmp.tiles1=JSON.parse(JSON.stringify(tiles1));
  tmp.tiles2=JSON.parse(JSON.stringify(tiles2));
  tmp.tiles3=JSON.parse(JSON.stringify(tiles3));
  tmp.firstneededscores=JSON.parse(JSON.stringify(firstneededscores));
  tmp.baopai=JSON.parse(JSON.stringify(baopai));
  tmp.liqibang=JSON.parse(JSON.stringify(liqibang));
  tmp.lstliqi=JSON.parse(JSON.stringify(lstliqi));
  tmp.doracnt=JSON.parse(JSON.stringify(doracnt));
  tmp.playertiles=JSON.parse(JSON.stringify(playertiles));
  tmp.fulu=JSON.parse(JSON.stringify(fulu));
  tmp.paihe=JSON.parse(JSON.stringify(paihe));
  tmp.muyu=JSON.parse(JSON.stringify(muyu));
  tmp.liqiinfo=JSON.parse(JSON.stringify(liqiinfo));
  tmp.drawtype=JSON.parse(JSON.stringify(drawtype));
  tmp.lstdrawtype=JSON.parse(JSON.stringify(lstdrawtype));
  tmp.doras=JSON.parse(JSON.stringify(doras));
  tmp.li_doras=JSON.parse(JSON.stringify(li_doras));
  tmp.delta_scores=JSON.parse(JSON.stringify(delta_scores));
  tmp.muyutimes=JSON.parse(JSON.stringify(muyutimes));
  tmp.muyuseats=JSON.parse(JSON.stringify(muyuseats));
  tmp.mingpais=JSON.parse(JSON.stringify(mingpais));
  tmp.chang=JSON.parse(JSON.stringify(chang));
  tmp.ju=JSON.parse(JSON.stringify(ju));
  tmp.ben=JSON.parse(JSON.stringify(ben));
  tmp.playercnt=JSON.parse(JSON.stringify(playercnt));
  tmp.actions=JSON.parse(JSON.stringify(actions));
  tmp.xun=JSON.parse(JSON.stringify(xun));
  tmp.players=JSON.parse(JSON.stringify(players));
  tmp.benchangbang=JSON.parse(JSON.stringify(benchangbang));
  tmp.chuanmagangs=JSON.parse(JSON.stringify(chuanmagangs));
  tmp.config=JSON.parse(JSON.stringify(config));
  tmp.hules_history=JSON.parse(JSON.stringify(hules_history));
  tmp.hupaied=JSON.parse(JSON.stringify(hupaied));
  tmp.paishan=JSON.parse(JSON.stringify(paishan));
  tmp.discardtiles=JSON.parse(JSON.stringify(discardtiles));
  tmp.gaps=JSON.parse(JSON.stringify(gaps));
  tmp.juc=JSON.parse(JSON.stringify(juc));
  tmp.settings=JSON.parse(JSON.stringify(settings));
  tmp.editdata=JSON.parse(JSON.stringify(editdata));
  lstscene=tmp;
}
function loadproject(x){
  if(x!=undefined){
    scores=JSON.parse(JSON.stringify(x.scores));
    tiles0=JSON.parse(JSON.stringify(x.tiles0));
    tiles1=JSON.parse(JSON.stringify(x.tiles1));
    tiles2=JSON.parse(JSON.stringify(x.tiles2));
    tiles3=JSON.parse(JSON.stringify(x.tiles3));
    firstneededscores=JSON.parse(JSON.stringify(x.firstneededscores));
    baopai=JSON.parse(JSON.stringify(x.baopai));
    liqibang=JSON.parse(JSON.stringify(x.liqibang));
    lstliqi=JSON.parse(JSON.stringify(x.lstliqi));
    doracnt=JSON.parse(JSON.stringify(x.doracnt));
    playertiles=JSON.parse(JSON.stringify(x.playertiles));
    fulu=JSON.parse(JSON.stringify(x.fulu));
    paihe=JSON.parse(JSON.stringify(x.paihe));
    muyu=JSON.parse(JSON.stringify(x.muyu));
    liqiinfo=JSON.parse(JSON.stringify(x.liqiinfo));
    drawtype=JSON.parse(JSON.stringify(x.drawtype));
    lstdrawtype=JSON.parse(JSON.stringify(x.lstdrawtype));
    doras=JSON.parse(JSON.stringify(x.doras));
    li_doras=JSON.parse(JSON.stringify(x.li_doras));
    delta_scores=JSON.parse(JSON.stringify(x.delta_scores));
    muyutimes=JSON.parse(JSON.stringify(x.muyutimes));
    muyuseats=JSON.parse(JSON.stringify(x.muyuseats));
    mingpais=JSON.parse(JSON.stringify(x.mingpais));
    chang=JSON.parse(JSON.stringify(x.chang));
    ju=JSON.parse(JSON.stringify(x.ju));
    ben=JSON.parse(JSON.stringify(x.ben));
    playercnt=JSON.parse(JSON.stringify(x.playercnt));
    actions=JSON.parse(JSON.stringify(x.actions));
    xun=JSON.parse(JSON.stringify(x.xun));
    players=JSON.parse(JSON.stringify(x.players));
    benchangbang=JSON.parse(JSON.stringify(x.benchangbang));
    chuanmagangs=JSON.parse(JSON.stringify(x.chuanmagangs));
    config=JSON.parse(JSON.stringify(x.config));
    hules_history=JSON.parse(JSON.stringify(x.hules_history));
    hupaied=JSON.parse(JSON.stringify(x.hupaied));
    paishan=JSON.parse(JSON.stringify(x.paishan));
    discardtiles=JSON.parse(JSON.stringify(x.discardtiles));
    gaps=JSON.parse(JSON.stringify(x.gaps));
    juc=JSON.parse(JSON.stringify(x.juc));
    settings=JSON.parse(JSON.stringify(x.settings));
    editdata=JSON.parse(JSON.stringify(x.editdata));
    return;
  }
  scores=[25000,25000,25000,25000];tiles0=null;tiles1=null;tiles2=null;tiles3=null;
  liqibang=0;muyu={'count':5,'seat':0,'id':0};
  mingpais=[{},{},{},{}];chang=0;ju=0;ben=0;
  paishan=null;discardtiles=["","","",""];juc=-1;
  editdata={
    'actions':[],
    'xun':[],
    'players':null,
    'config':{},
    'player_datas':[{'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                    {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                    {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]},
                    {'avatar_frame':0,'avatar_id':400101,'nickname':"电脑(简单)",'title':600001,'views':[]}]
  };
}
function edit_online(){
  saveproject();
  if(actions.length!=0)roundend(true);
  gameend(true);
  try{
    if(view.DesktopMgr.Inst.active){
      //console.log("Path1");
      editgame(JSON.parse(JSON.stringify(editdata)));
    }
    else{
      //console.log("Path2");
      edit(JSON.parse(JSON.stringify(editdata)));
    }
  }catch(e){
    //console.log("Path2");
    edit(JSON.parse(JSON.stringify(editdata)));
  }
  try{view.DesktopMgr.Inst.player_datas=(JSON.parse(JSON.stringify(x))).player_datas}catch(e){};
  try{view.DesktopMgr.Inst.gameEndResult.players=(JSON.parse(JSON.stringify(x))).players;}catch(e){};
  loadproject(lstscene);
}
function init(){
  try{
    if(unsafeWindow.tiles0!=null){tiles0=unsafeWindow.tiles0;unsafeWindow.tiles0=null;}
    if(unsafeWindow.tiles1!=null){tiles1=unsafeWindow.tiles1;unsafeWindow.tiles1=null;}
    if(unsafeWindow.tiles2!=null){tiles2=unsafeWindow.tiles2;unsafeWindow.tiles2=null;}
    if(unsafeWindow.tiles3!=null){tiles3=unsafeWindow.tiles3;unsafeWindow.tiles3=null;}
    if(unsafeWindow.paishan!=null){paishan=unsafeWindow.paishan;unsafeWindow.paishan=null;}
    if(unsafeWindow.discardtiles!=null){discardtiles=unsafeWindow.discardtiles;unsafeWindow.discardtiles=null;}
    if(unsafeWindow.muyuseats!=null){muyuseats=unsafeWindow.muyuseats;unsafeWindow.muyuseats=null}
  }catch(e){};
  muyutimes=[1,1,1,1];
  if(typeof(muyuseats)=="number")muyuseats=muyuseats.toString();
  xun=[[],[],[],[]];
  gaps=[];
  baopai=[];
  actions=[];
  lstliqi=0;
  chuanmagangs={'over':[],'notover':[]};
  doracnt={'cnt':1,'lsttype':0};
  hupaied=[false,false,false,false];
  hules_history=[];
  playertiles=[[],[],[],[]];
  fulu=[[],[],[],[]];
  paihe=[{'liujumanguan':true,'tiles':[]},{'liujumanguan':true,'tiles':[]},
         {'liujumanguan':true,'tiles':[]},{'liujumanguan':true,'tiles':[]}];
  liqiinfo=[{'liqi':0,'kai':0,'yifa':1},{'liqi':0,'kai':0,'yifa':1},
            {'liqi':0,'kai':0,'yifa':1},{'liqi':0,'kai':0,'yifa':1}];
  drawtype=1;lstdrawtype=1;
  playercnt;doras=[];li_doras=[];
  if(tiles0==null&&tiles1==null&&tiles2==null&&tiles3==null){
    tiles0=[];tiles1=[];tiles2=[];tiles3=[];
    if(paishan==null)paishan=randompaishan("");
    for(let i=1;i<=3;i++){
      if(ju==0)for(let o=1;o<=4;o++){tiles0.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      if(ju==0||ju==1)for(let o=1;o<=4;o++){tiles1.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      if(ju==0||ju==1||ju==2)for(let o=1;o<=4;o++){tiles2.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      for(let o=1;o<=4;o++){tiles3.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      if(ju==1||ju==2||ju==3)for(let o=1;o<=4;o++){tiles0.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      if(ju==2||ju==3)for(let o=1;o<=4;o++){tiles1.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
      if(ju==3)for(let o=1;o<=4;o++){tiles2.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    }
    if(ju==0){tiles0.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    if(ju==0||ju==1){tiles1.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    if(ju==0||ju==1||ju==2){tiles2.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    tiles3.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);
    tiles0.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);
    if(ju==1||ju==2||ju==3){tiles1.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    if(ju==2||ju==3){tiles2.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
    if(ju==3){tiles3.push(paishan.substring(paishan.length-2));paishan=paishan.substring(0,paishan.length-2);}
  }
  paishan=decompose(paishan);
  if(tiles0==null)tiles0=[];if(tiles1==null)tiles1=[];
  if(tiles2==null)tiles2=[];if(tiles3==null)tiles3=[];
  for(let i=0;i<discardtiles.length;i++)discardtiles[i]=decompose(discardtiles[i]);
  if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
  if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
  if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
  if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
  tiles0.sort(cmp);
  tiles1.sort(cmp);
  tiles2.sort(cmp);
  tiles3.sort(cmp);
  if(tiles2.length==0&&tiles3.length==0){
    playercnt=2;
    for(let i=0;i<5;i++){
      doras[i]=paishan[paishan.length-26-4*i]+paishan[paishan.length-25-4*i];
      li_doras[i]=paishan[paishan.length-28-4*i]+paishan[paishan.length-27-4*i];
    }
  }
  else if(tiles3.length==0){
    playercnt=3;
    for(let i=0;i<5;i++){
      doras[i]=paishan[paishan.length-18-4*i]+paishan[paishan.length-17-4*i];
      li_doras[i]=paishan[paishan.length-20-4*i]+paishan[paishan.length-19-4*i];
    }
  }
  else {
    playercnt=4;
    for(let i=0;i<5;i++){
      doras[i]=paishan[paishan.length-10-4*i]+paishan[paishan.length-9-4*i];
      li_doras[i]=paishan[paishan.length-12-4*i]+paishan[paishan.length-11-4*i];
    }
  }
  delta_scores=[];
  for(let i=0;i<playercnt;i++)delta_scores[i]=0;
  for(let i=0;i<tiles0.length;i++)playertiles[0][i]=tiles0[i];
  for(let i=0;i<tiles1.length;i++)playertiles[1][i]=tiles1[i];
  for(let i=0;i<tiles2.length;i++)playertiles[2][i]=tiles2[i];
  for(let i=0;i<tiles3.length;i++)playertiles[3][i]=tiles3[i];
}
function is_xuezhandaodi(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.xuezhandaodi)return true;
  return false;
}
function is_huansanzhang(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.huansanzhang)return true;
  return false;
}
function is_guyi(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.guyi_mode)return true;
  return false;
}
function is_peipaimingpai(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.begin_open_mode)return true;
  return false;
}
function is_dora3(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora3_mode)return true;
  return false;
}
function is_muyu(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.muyu_mode)return true;
  return false;
}
function is_chuanma(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.chuanma)return true;
  return false;
}
function is_xueliu(){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.xueliu)return true;
  return false;
}
function is_openhand(seat){
  if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.open_hand&&config.mode.detail_rule.open_hand[seat]=='1')return true;
  return false;
}
function is_shiduan(){
  if(!config)return true;
  if(!config.mode||config.category==2)return true;
  if(!config.mode.detail_rule)return true;
  if(config.mode.detail_rule.shiduan==undefined||config.mode.detail_rule.shiduan==true)return true;
  return false;
}
function fanfu(){
  if(!config)return 1;
  if(!config.mode)return 1;
  if(!config.mode.detail_rule||config.mode.detail_rule.fanfu==0)return 1;
  if(config.mode.detail_rule.fanfu)return config.mode.detail_rule.fanfu;
  return 1;
}
function have_zimosun(){
  if(!config)return true;
  if(!config.mode||config.category==2)return true;
  if(!config.mode.detail_rule)return true;
  if(config.mode.detail_rule.have_zimosun==undefined||config.mode.detail_rule.have_zimosun==true)return true;
  return false;
}
function get_muyu(type){
  if(type=="new"){
    muyu.id++;
    muyu.count=5;
    if(muyuseats&&muyuseats[0]){
      muyu.seat=parseInt(muyuseats[0]);
      muyuseats=muyuseats.substring(1);
    }
    else muyu.seat=Math.floor(Math.random()*4);
  }
  if(type=="countdown"){
    muyu.count--;
  }
  return muyu;
}
function update_muyu(){
  muyutimes=[1,1,1,1];
  muyutimes[muyu.seat]++;
}
function decompose(x){
  for(let i=0;i<x.length;i++){
    if(x[i]!='m'&&x[i]!='p'&&x[i]!='s'&&x[i]!='z')
      for(let j=i+1;j<x.length;j++){
        if(x[j]=='m'||x[j]=='p'||x[j]=='s'||x[j]=='z'){
          if(j!=i+1)x=x.substring(0,i+1)+x[j]+x.substring(i+1);
          i++;
          break;
        }
      }
  }
  return x;
}
function separatetile(x){
  x=decompose(x);
  let ret=[];
  while(x.length>0){
    ret.push(x.substring(0,2));
    x=x.substring(2);
  }
  return ret;
}
function getlstaction(x){
  if(actions.length!=0){
    if(x==undefined)x=1;
    let ret=actions.length;
    for(let i=1;i<=x;i++){
      ret--;
      while(actions[ret]!=undefined&&(actions[ret].name=="RecordSelectGap"||actions[ret].name=="RecordGangResult"))ret--;
    }
    return actions[ret];
  }
  else return editdata.actions[editdata.actions.length-1][editdata.actions[editdata.actions.length-1].length-1];
}
var nxt2=[0,2,3,4,5,6,7,8,9,35,11,12,13,14,15,16,17,18,35,20,21,22,23,24,25,26,27,35,35,35,35,35,35,35,35,36,0,0,0,0];
var doranxt=[0,2,3,4,5,6,7,8,9, 1,11,12,13,14,15,16,17,18,10,20,21,22,23,24,25,26,27,19,29,30,31,28,33,34,32];
function equaltile(x,y){
  if(x[1]==y[1]&&x[0]=='0'&&y[0]=='5')return 1;
  if(x[1]==y[1]&&x[0]=='5'&&y[0]=='0')return 1;
  if(x==y)return 1;
  return 0;
}
function tiletoint(tile,type){
  if(type!=undefined){
    if(tile=="0m")return 35;
    if(tile=="0p")return 36;
    if(tile=="0s")return 37;
  }
  if(tile[0]=='0')tile='5'+tile[1];
  if(tile[1]=='m')return parseInt(tile);
  if(tile[1]=='p')return 9+parseInt(tile);
  if(tile[1]=='s')return 18+parseInt(tile);
  if(tile[1]=='z')return 27+parseInt(tile);
}
function inttotile(x){
  if(x>=1&&x<=9)return x.toString()+"m";
  if(x>=10&&x<=18)return (x-9).toString()+"p";
  if(x>=19&&x<=27)return (x-18).toString()+"s";
  if(x>=28&&x<=34)return (x-27).toString()+"z";
  if(x==35)return "0m";
  if(x==36)return "0p";
  if(x==37)return "0s";
}
function huazhu(seat){
  for(let i=0;i<playertiles[seat].length;i++){
    if(Math.floor((tiletoint(playertiles[seat][i])-1)/9)==0&&gaps[seat]==1)return true;
    if(Math.floor((tiletoint(playertiles[seat][i])-1)/9)==1&&gaps[seat]==0)return true;
    if(Math.floor((tiletoint(playertiles[seat][i])-1)/9)==2&&gaps[seat]==2)return true;
  }
  for(let i=0;i<fulu[seat].length;i++){
    if(Math.floor((tiletoint(fulu[seat][i].tile[0])-1)/9)==0&&gaps[seat]==1)return true;
    if(Math.floor((tiletoint(fulu[seat][i].tile[0])-1)/9)==1&&gaps[seat]==0)return true;
    if(Math.floor((tiletoint(fulu[seat][i].tile[0])-1)/9)==2&&gaps[seat]==2)return true;
  }
  return false;
}
function erasemingpai(tile,seat){
  if(mingpais[seat][tile]>0){
    mingpais[seat][tile]--;
    return 1;
  }
  return 0;
}
function calchupai(tls){
  let cnt=[],tmp=[];
  for(let i=0;i<=36;i++){cnt[i]=0;tmp[i]=0;}
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  for(let i=1;i<=34;i++)if(cnt[i]>4)return 0;
  for(let i=1;i<=34;i++){
    if(cnt[i]>=2){
      let ok=1;
      cnt[i]-=2;
      for(let j=1;j<=34;j++)tmp[j]=cnt[j];
      for(let k=1;k<=3;k++){
        for(let j=k*9-8;j;j=nxt2[j]){
          if(tmp[j]<0){
            ok=0;
            break;
          }
          tmp[j]%=3;
          tmp[nxt2[j]]-=tmp[j];
          tmp[nxt2[nxt2[j]]]-=tmp[j];
        }
        tmp[35]=tmp[36]=0;
      }
      for(let j=28;j<=34;j++)if(tmp[j]%3!=0)ok=0;
      cnt[i]+=2;
      if(ok)return 1;
    }
  }
  let duizi=0;
  for(let i=1;i<=34;i++){
    if(cnt[i]==2)duizi++;
    if(cnt[i]==4&&is_chuanma())duizi+=2;
  }
  if(duizi==7)return 2;
  let guoshi=1;
  for(let i=1;i<=34;i++){
    if(i==1||i==9||i==10||i==18||i==19||i>=27&&i<=34){if(cnt[i]==0)guoshi=0;}
    else if(cnt[i]!=0)guoshi=0;
  }
  if(guoshi)return 3;
  return 0;
}
function tingpai(seat){
  if(is_chuanma()&&huazhu(seat))return [];
  let tls=playertiles[seat];
  let cnt=[];
  for(let i=0;i<=36;i++)cnt[i]=0;
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  //for(let i=fulu[seat].length-1;i>=0;i--)if(fulu[seat][i].type==3)cnt[tiletoint(fulu[seat][i].tile[0])]+=4;
  let res=[];
  for(let i=1;i<=34;i++){
    tls.push(inttotile(i));
    cnt[i]++;
    if(cnt[i]<5&&calchupai(tls)!=0)res.push({'tile':inttotile(i)});
    tls.length=tls.length-1;
    cnt[i]--;
  }
  return res;
}
function inserthules_history(x){
  let flag=false;
  for(let i=0;i<hules_history.length;i++){
    let y=hules_history[i];
    let flag2=true;
    if(x.seat!=y.seat)flag2=false;
    if(x.hu_tile!=y.hu_tile)flag2=false;
    if(y.fans.length!=x.fans.length)flag2=false;
    if(x.dadian!=y.dadian)flag2=false;
    if(x.zimo!=y.zimo)flag2=false;
    if(flag2)for(let j=0;j<x.fans.length;j++){
      if(x.fans[j].val!=y.fans[j].val||x.fans[j].id!=y.fans[j].id)flag2=false;
    }
    if(flag2==true)flag=true;
  }
  if(flag==false)hules_history.push(x);
}
function calcsudian_chuanma(x,type){
  if(type==undefined)type=0;
  let val=0;
  for(let i=0;i<x.length;i++)val=val+x[i].val;
  return Math.min(1000*Math.pow(2,val-1),32000)+type*val;
}
function calcsudian(x,type){
  if(type==undefined)type=0;
  let val=0;
  for(let i=0;i<x.fans.length;i++)val=val+x.fans[i].val;
  if(x.yiman==true)return 8000*val+type*val+type*x.fu/5*0.01;
  else if(val<fanfu())return -2000;
  else if(val==5)return 2000+type*val+type*x.fu/5*0.01;
  else if(val==6||val==7)return 3000+type*val+type*x.fu/5*0.01;
  else if(val>=8&&val<=10)return 4000+type*val+type*x.fu/5*0.01;
  else if(val==11||val==12)return 6000+type*val+type*x.fu/5*0.01;
  else if(val>=13)return 8000+type*val+type*x.fu/5*0.01;
  else return Math.min(Math.pow(2,val+2)*x.fu,2000)+type*val+type*x.fu/5*0.01;
}
//0：副露的顺子   1：副露的刻子  2：明杠
//3：暗杠         4：拔北宝牌    5：未副露的顺子 
//6：未副露的刻子 7：对子 

//1~64
//自摸   立直   抢杠     岭上   海底   河底   白     发     中     门风 
//场风   断幺   一杯     平和   混全   一气   三色   w立    三同刻 三杠
//对对   三暗   小三元   混老头 七对   纯全   混     二杯   清     一发
//dora   红宝   里宝     北宝   天和   地和   带三元 四暗   字一色 绿一色
//清老头 国士   小四喜   四杠   九莲   八连庄 纯九   四单   十三面 带四喜
//燕返   杠振   十二落抬 五门齐 三连刻 三同顺 1p摸月 9p捞鱼 人和   带车轮
//大竹林 大数邻 石上     带七星
function calcfan_chuanma(tls,seat,zimo,type){
  if(tls.length%3==1){
    let tingpais=tingpai(seat),ret=[];
    for(let i=0;i<tingpais.length;i++){
      tls.push(tingpais[i].tile);
      let tmp=calcfan_chuanma([].concat(tls),seat,zimo,1);
      if(calcsudian_chuanma(tmp,1)>calcsudian_chuanma(ret,1))ret=tmp;
      tls.length--;
    }
    return ret;
  }
  let vals=[];
  function tofan(x){
    let ans=[];
    for(let i=1019;i>=1005;i--){
      if(i==1014&&x[1020]){
        ans.push({'val':x[1020],'id':1020});
        break;
      }
      if(x[i]){
        ans.push({'val':x[i],'id':i});
        break;
      }
      if(i==1005&&ans.length==0){ans.push({'val':x[1003],'id':1003});}
    }
    if(x[1000])ans.push({'val':x[1000],'id':1000});
    if(x[1001])ans.push({'val':x[1001],'id':1001});
    if(x[1002])ans.push({'val':x[1002],'id':1002});
    if(x[1004])ans.push({'val':x[1004],'id':1004});
    if(x[1021])ans.push({'val':x[1021],'id':1021});
    return ans;
  }
  let lsttile=tls[tls.length-1],fulucnt=0;
  let ret=[];
  let cnt=[];
  for(let i=0;i<=36;i++){cnt[i]=0;}
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  let partition=[];
  for(let i=0;i<fulu[seat].length;i++){
    if(fulu[seat][i].type!=4)partition.push(fulu[seat][i]);
    if(fulu[seat][i].type!=4)fulucnt++;
  }
  function updateret(x){
    if(calcsudian_chuanma(x,1)>calcsudian_chuanma(ret,1))ret=x;
  }
  function calc(){
    let cnt2=[];
    for(let i=0;i<=36;i++)cnt2[i]=0;
    let partitiontmp=[].concat(partition);
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tiles=partitiontmp[i].tile;
      if(partitiontmp[i].type==0||partitiontmp[i].type==5){
        cnt2[tiletoint(tiles[0])]++;
        cnt2[tiletoint(tiles[1])]++;
        cnt2[tiletoint(tiles[2])]++;
      }
      else if(partitiontmp[i].type==1||partitiontmp[i].type==6)cnt2[tiletoint(tiles[0])]+=3;
      else if(partitiontmp[i].type==2||partitiontmp[i].type==3)cnt2[tiletoint(tiles[0])]+=4;
      else if(partitiontmp[i].type==7)cnt2[tiletoint(tiles[0])]+=2;
    }
    function calc0(){
      let ans=[];
      let typecnt=[];
      for(let i=0;i<=34;i++)typecnt[i]=[0,0,0];
      for(let i=0;i<partitiontmp.length;i++){
        let type=partitiontmp[i].type;
        if(type==1||type==2||type==3||type==6||type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][0]=type;
        if(type==1||type==2||type==3||type==6)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=2;
        if(type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=1;
        if(type==0||type==5)typecnt[(tiletoint(partitiontmp[i].tile[0])+tiletoint(partitiontmp[i].tile[1])+tiletoint(partitiontmp[i].tile[2]))/3][2]++;
      } 
      //--------------------------
      let quandai=true;
      for(let i=1;i<=34;i++){
        if(i!=2&&i!=8&&i!=11&&i!=17&&i!=20&&i!=26&&typecnt[i][2]>0)quandai=false;
        if(i!=1&&i!=9&&i!=10&&i!=18&&i!=19&&i!=27&&i<28&&typecnt[i][1]!=0)quandai=false;
      }
      //--------------------------
      let qingyise=false;
      for(let k=0;k<=3;k++){
        qingyise=true;
        for(let i=1;i<=34;i++){
          if(Math.floor((i-1)/9)!=k&&i<=27&&cnt2[i]>0)qingyise=false;
        }
        if(qingyise==true)break;
      }
      //--------------------------
      let gangzi=0,kezi=0,duizi=0;
      for(let i=1;i<=34;i++){
        if(typecnt[i][0]==3||typecnt[i][0]==2)gangzi++;
        if(typecnt[i][1]==2)kezi++;
      }
      if(partitiontmp.length==7)duizi=7;
      //---------------------------
      let jiangdui=true;
      for(let i=1;i<=34;i++){
        if(i!=2&&i!=5&&i!=8&&i!=11&&i!=14&&i!=17&&i!=20&&i!=23&&i!=26&&cnt2[i]>0)jiangdui=false;
      }
      //---------------------------
      if(settings.chuanma_points_method){
        ans.push({'val':1,'id':1003});
        ans.push({'val':0,'id':1000});
        for(let i=1;i<=34;i++)if(cnt2[i]==4)ans[1].val++;
        if(ans[1].val==0)ans.length--;
        if(type!=1&&zimo&&getlstaction(2)!=undefined&&(getlstaction(2).name=="RecordAnGangAddGang"||getlstaction(2).name=="RecordChiPengGang"))ans.push({'val':1,'id':1001});
        if(type!=1&&!zimo&&getlstaction().name!="RecordAnGangAddGang"&&getlstaction(3)!=undefined&&(getlstaction(3).name=="RecordAnGangAddGang"||getlstaction(3).name=="RecordChiPengGang"))ans.push({'val':1,'id':1002});
        if(type!=1&&getlstaction().name=="RecordAnGangAddGang")ans.push({'val':1,'id':1004});
        if(kezi==4)ans.push({'val':1,'id':1005});
        if(qingyise)ans.push({'val':2,'id':1006});
        if(duizi==7)ans.push({'val':2,'id':1007});
        if(quandai)ans.push({'val':2,'id':1008});
        if(fulucnt==4)ans.push({'val':1,'id':1009});
        if(jiangdui)ans.push({'val':2,'id':1011});
        if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat==ju&&zimo)ans.push({'val':5,'id':1018});
        if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&zimo)ans.push({'val':5,'id':1019});
        if(type!=1&&paishan.length/2==0)ans.push({'val':1,'id':1021});
        return ans;
      }
      else{
        ans[1000]=0;
        for(let i=1;i<=34;i++)if(cnt2[i]==4)ans[1000]++;//根
        if(type!=1&&zimo&&getlstaction(2)!=undefined&&(getlstaction(2).name=="RecordAnGangAddGang"||getlstaction(2).name=="RecordChiPengGang"))ans[1001]=1;//杠上花
        if(type!=1&&!zimo&&getlstaction().name!="RecordAnGangAddGang"&&getlstaction(3)!=undefined&&(getlstaction(3).name=="RecordAnGangAddGang"||getlstaction(3).name=="RecordChiPengGang"))ans[1002]=1;//杠上炮
        ans[1003]=1;
        if(type!=1&&getlstaction().name=="RecordAnGangAddGang")ans[1004]=1;//抢杠
        if(kezi==4)ans[1005]=2;//对对和 
        if(qingyise)ans[1006]=3;//清一色
        if(duizi==7)ans[1007]=3;//七对子 
        if(quandai)ans[1008]=3;//带幺九
        if(fulucnt==4)ans[1009]=3;//金钩钩
        if(qingyise&&kezi==4)ans[1010]=4;//清对
        if(jiangdui&&kezi==4)ans[1011]=4;//将对
        if(ans[1000]>0&&duizi==7){ans[1012]=4;ans[1000]--;}//龙七对
        if(qingyise&&duizi==7)ans[1013]=5;//清七对
        if(qingyise&&fulucnt==4)ans[1014]=5;//清金钩钩
        if(qingyise&&ans[1012]==4)ans[1015]=6;//清龙七对
        if(gangzi==4){ans[1016]=6;ans[1000]-=4;}//十八罗汉
        if(qingyise&&gangzi==4)ans[1017]=6;//清十八罗汉
        if(paihe[seat].tiles.length==0&&seat==ju&&zimo)ans[1018]=6;//天和 
        if(paihe[seat].tiles.length==0&&seat!=ju&&zimo)ans[1019]=6;//地和 
        if(qingyise&&quandai)ans[1020]=5;//清带幺
        if(type!=1&&paishan.length/2==0)ans[1021]=1;//海底捞月 
        return tofan(ans);
      }
    }
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tile=partitiontmp[i].tile,type=partitiontmp[i].type;
      if(type==5&&(equaltile(tile[0],lsttile)||equaltile(tile[1],lsttile)||equaltile(tile[2],lsttile))){
        if(!zimo)partitiontmp[i].type=0;
        let midtile=inttotile((tiletoint(tile[0])+tiletoint(tile[1])+tiletoint(tile[2]))/3);
        if(equaltile(midtile,lsttile))updateret(calc0());
        else if(tiletoint(lsttile)%9==3&&tiletoint(midtile)%9==2)updateret(calc0());
        else if(tiletoint(lsttile)%9==7&&tiletoint(midtile)%9==8)updateret(calc0());
        else updateret(calc0());
        partitiontmp[i].type=5;
      }
      if(type==6&&equaltile(tile[0],lsttile)){
        if(!zimo)partitiontmp[i].type=1;
        updateret(calc0());
        partitiontmp[i].type=6;
      }
      if(type==7&&equaltile(tile[0],lsttile))updateret(calc0());
    }
  }
  function dfs(now){
    if(now==35){
      if(partition.length==7||partition.length==5)calc();
      return;
    }
    if(cnt[now]==0){
      dfs(now+1);
      return;
    }
    let whatever=[0,2,3];
    for(let k=0;k<3;k++){
      if(cnt[now]<whatever[k])continue;
      cnt[now]-=whatever[k];
      let cnt0=cnt[now];
      if(k==1){
        partition.push({'type':7,'tile':[inttotile(now),inttotile(now)]});
        dfs(now);
      }
      else if(k==2)partition.push({'type':6,'tile':[inttotile(now),inttotile(now),inttotile(now)]});
      if(cnt[nxt2[now]]>=cnt0&&cnt[nxt2[nxt2[now]]]>=cnt0){
        cnt[now]-=cnt0;
        cnt[nxt2[now]]-=cnt0;
        cnt[nxt2[nxt2[now]]]-=cnt0;
        for(let i=1;i<=cnt0;i++)partition.push({'type':5,'tile':[inttotile(now),inttotile(nxt2[now]),inttotile(nxt2[nxt2[now]])]});
        dfs(now+1);
        cnt[now]+=cnt0;
        cnt[nxt2[now]]+=cnt0;
        cnt[nxt2[nxt2[now]]]+=cnt0;
        for(let i=1;i<=cnt0;i++)partition.length=partition.length-1;
      }
      if(k==1||k==2)partition.length=partition.length-1;
      cnt[now]+=whatever[k];
    }
  }
  dfs(1);
  return ret;
}
function calcfan(tls,seat,zimo,fangchong){
  let lsttile=tls[tls.length-1],fulucnt=0;
  let ret={'yiman':false,'fans':0,'fu':0};
  let cnt=[],tmp=[];
  for(let i=0;i<=36;i++){cnt[i]=0;tmp[i]=0;}
  for(let i=0;i<tls.length;i++)cnt[tiletoint(tls[i])]++;
  let partition=[];
  for(let i=0;i<fulu[seat].length;i++){
    if(fulu[seat][i].type!=4)partition.push(fulu[seat][i]);
    if(fulu[seat][i].type!=4&&fulu[seat][i].type!=3)fulucnt++;
  }
  function updateret(x){
    if(x==undefined)return;
    if(calcsudian(x,1)>calcsudian(ret,1))ret=x;
  }
  function calc(){
    let cnt2=[];
    for(let i=0;i<=36;i++)cnt2[i]=0;
    let partitiontmp=[].concat(partition);
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tiles=partitiontmp[i].tile;
      if(partitiontmp[i].type==0||partitiontmp[i].type==5){
        cnt2[tiletoint(tiles[0])]++;
        cnt2[tiletoint(tiles[1])]++;
        cnt2[tiletoint(tiles[2])]++;
      }
      else if(partitiontmp[i].type==1||partitiontmp[i].type==6)cnt2[tiletoint(tiles[0])]+=3;
      else if(partitiontmp[i].type==2||partitiontmp[i].type==3)cnt2[tiletoint(tiles[0])]+=4;
      else if(partitiontmp[i].type==7)cnt2[tiletoint(tiles[0])]+=2;
    }
    function calc0(tingpaifu){
      function deletefan(ans,x){
        let flag=false;
        for(let i=0;i<ans.fans.length;i++){
          if(flag)ans.fans[i-1]=ans.fans[i];
          if(ans.fans[i].id==x)flag=true;
        }
        if(flag)ans.fans.length=ans.fans.length-1;
        return ans;
      }
      let tianhu=false;
      let ans={'yiman':true,'fans':[],'fu':0};
      //---------------------------------------------- 
      let typecnt=[];
      for(let i=0;i<=34;i++)typecnt[i]=[0,0,0];
      for(let i=0;i<partitiontmp.length;i++){
        let type=partitiontmp[i].type;
        if(type==1||type==2||type==3||type==6||type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][0]=type;
        if(type==1||type==2||type==3||type==6)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=2;
        if(type==7)typecnt[tiletoint(partitiontmp[i].tile[0])][1]=1;
        if(type==0||type==5)typecnt[(tiletoint(partitiontmp[i].tile[0])+tiletoint(partitiontmp[i].tile[1])+tiletoint(partitiontmp[i].tile[2]))/3][2]++;
      } 
      let anke=0,gangzi=0,beikou=0,kezi=0,duizi=0,santongshun=false,sanlianke=false;
      for(let i=1;i<=34;i++){
        if(typecnt[i][0]==3||typecnt[i][0]==6)anke++;
        if(typecnt[i][0]==3||typecnt[i][0]==2)gangzi++;
        if(typecnt[i][1]==2)kezi++;
        if(i>=2&&i<=8||i>=11&&i<=17||i>=20&&i<=26){
          if(typecnt[i][1]==2&&typecnt[i-1][1]==2&&typecnt[i+1][1]==2)sanlianke=true;
        }
        if(typecnt[i][0]==7)duizi++;
        beikou+=Math.floor(typecnt[i][2]/2);
        if(Math.floor(typecnt[i][2]/3)>0)santongshun=true;
      }
      //--------------------------- 
      let flag=[true,true,true,true,true];
      for(let i=1;i<=34;i++){
        if(i!=28&&i!=29&&i!=30&&i!=31&&i!=32&&i!=33&&i!=34&&cnt2[i]>0)flag[0]=false;
        if(i!=20&&i!=21&&i!=22&&i!=24&&i!=26&&i!=33&&cnt2[i]>0)flag[1]=false;
        if(i!=1&&i!=9&&i!=10&&i!=18&&i!=19&&i!=27&&cnt2[i]>0)flag[2]=false;
        if((i==1||i==9||i==10||i==18||i==19||i==27||i>=28&&i<=34)&&cnt2[i]>0)flag[3]=false;
        if((i>=2&&i<=8||i>=11&&i<=17||i>=20&&i<=26)&&cnt2[i]>0)flag[4]=false;
      }
      //---------------------------------
      let wumenqi=true;
      if(cnt2[1]+cnt2[2]+cnt2[3]+cnt2[4]+cnt2[5]+cnt2[6]+cnt2[7]+cnt2[8]+cnt2[9]==0)wumenqi=false;
      if(cnt2[10]+cnt2[11]+cnt2[12]+cnt2[13]+cnt2[14]+cnt2[15]+cnt2[16]+cnt2[17]+cnt2[18]==0)wumenqi=false;
      if(cnt2[19]+cnt2[20]+cnt2[21]+cnt2[22]+cnt2[23]+cnt2[24]+cnt2[25]+cnt2[26]+cnt2[27]==0)wumenqi=false;
      if(cnt2[28]+cnt2[29]+cnt2[30]+cnt2[31]==0)wumenqi=false;
      if(cnt2[32]+cnt2[33]+cnt2[34]==0)wumenqi=false;
      //--------------------------------- 
      let jiulian=[0,""],yiqi=false,hunyise=false,qingyise=false;
      let jlbd=[0,3,1,1,1,1,1,1,1,3];
      for(let k=0;k<=2;k++){
        if(typecnt[k*9+2][2]>0&&typecnt[k*9+5][2]>0&&typecnt[k*9+8][2]>0)yiqi=true;
        jiulian=[1,""];
        for(let i=1;i<=9;i++)if(cnt2[k*9+i]<jlbd[i])jiulian=[0,""];
        if(jiulian[0]==1){
          for(let i=1;i<=9;i++)if(cnt2[k*9+i]>jlbd[i])jiulian[1]=inttotile(k*9+i);
          break;
        }
      }
      for(let i=partitiontmp.length-1;i>=0;i--)if(partitiontmp[i].type==3)jiulian=[0,""];
      for(let k=0;k<=3;k++){
        hunyise=true;qingyise=true;
        for(let i=1;i<=34;i++){
          if(Math.floor((i-1)/9)!=k&&cnt2[i]>0)qingyise=false;
          if(Math.floor((i-1)/9)!=k&&i<=27&&cnt2[i]>0)hunyise=false;
        }
        if(hunyise==true)break;
      }
      //----------------------------------
      let sanse=false,sansetongke=false;
      for(let i=1;i<=9;i++){
        if(i>=2&&i<=8&&typecnt[i][2]>0&&typecnt[i+9][2]>0&&typecnt[i+18][2]>0)sanse=true;
        if(typecnt[i][1]==2&&typecnt[i+9][1]==2&&typecnt[i+18][1]==2)sansetongke=true;
      }
      //---------------------------------- 
      let chunquandai=true,hunquandai=true;
      for(let i=1;i<=34;i++){
        if(i!=2&&i!=8&&i!=11&&i!=17&&i!=20&&i!=26&&typecnt[i][2]>0){chunquandai=false;hunquandai=false;}
        if(i!=1&&i!=9&&i!=10&&i!=18&&i!=19&&i!=27&&i<28&&typecnt[i][1]!=0){chunquandai=false;hunquandai=false;}
        if(i>=28&&i<=34&&typecnt[i][1]!=0)chunquandai=false;
      }
      //------------------------------------
      let pinghu=true;
      if(duizi==7)pinghu=false;
      for(let i=1;i<=34;i++){
        if(typecnt[i][1]==2)pinghu=false;
        if(typecnt[i][0]==7){
          if(tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z")==i)pinghu=false;
          if(tiletoint((chang+1).toString()+"z")==i)pinghu=false;
          if(i==32||i==33||i==34)pinghu=false;
        }
      }
      let flagcnt=0;
      if((tiletoint(lsttile)-1)%9>=3)if(typecnt[tiletoint(lsttile)-1][2])flagcnt++;
      if((tiletoint(lsttile)-1)%9<=5)if(typecnt[tiletoint(lsttile)+1][2])flagcnt++;
      if(flagcnt==0)pinghu=false;
      //------------------------------------- 
      let alldoras=[0,0,0,0];
      for(let i=0;i<fulu[seat].length;i++){
        if(fulu[seat][i].type==4){
          cnt2[tiletoint(fulu[seat][i].tile[0])]++;
          alldoras[2]++;
        }
      }
      for(let i=0;i<doracnt.cnt;i++){
        if((playercnt==3||playercnt==2)&&tiletoint(doras[i])==1)alldoras[0]+=cnt2[9];
        else if(playercnt==2&&tiletoint(doras[i])==10)alldoras[0]+=cnt2[18];
        else alldoras[0]+=cnt2[doranxt[tiletoint(doras[i])]];
        if((playercnt==3||playercnt==2)&&tiletoint(li_doras[i])==1)alldoras[3]+=cnt2[9];
        else if(playercnt==2&&tiletoint(li_doras[i])==10)alldoras[3]+=cnt2[18];
        else alldoras[3]+=cnt2[doranxt[tiletoint(li_doras[i])]];
      }
      for(let i=0;i<tls.length;i++)if(tls[i][0]=='0')alldoras[1]++;
      for(let i=0;i<fulu[seat].length;i++)
        for(let j=0;j<fulu[seat][i].tile.length;j++)if(fulu[seat][i].tile[j][0]=='0')alldoras[1]++;
      let lstaction=getlstaction();
      for(let i=0;i<fulu[seat].length;i++){
        if(fulu[seat][i].type==4){
          cnt2[tiletoint(fulu[seat][i].tile[0])]--;
        }
      }
      //------------------------------------
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat==ju&&zimo){ans.fans.push({'val':1,'id':35});tianhu=true;}//天和 
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&zimo)ans.fans.push({'val':1,'id':36});//地和 
      if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&!zimo&&is_guyi())ans.fans.push({'val':1,'id':59});//人和 
      if(typecnt[32][1]+typecnt[33][1]+typecnt[34][1]==6){
        ans.fans.push({'val':1,'id':37});//大三元
        let fulusanyuancnt=0;
        for(let i=0;i<fulu[seat].length;i++){
          let type=fulu[seat][i].type,tile=tiletoint(fulu[seat][i].tile[0]);
          if((type==1||type==2||type==3)&&(tile==32||tile==33||tile==34)){
            fulusanyuancnt++;
            if(fulusanyuancnt==3&&!is_xuezhandaodi()&&fulu[seat][i].from)baopai[seat]={'seat':fulu[seat][i].from,'val':1};
          }
        }
      }
      if(fulucnt==0&&anke==4&&typecnt[tiletoint(lsttile)][1]==2&&!tianhu)ans.fans.push({'val':1,'id':38});//四暗刻 
      if(flag[0]==true)ans.fans.push({'val':1,'id':39});//字一色 
      if(flag[1]==true)ans.fans.push({'val':1,'id':40});//绿一色 
      if(flag[2]==true)ans.fans.push({'val':1,'id':41});//清老头 
      if(typecnt[28][1]+typecnt[29][1]+typecnt[30][1]+typecnt[31][1]==7)ans.fans.push({'val':1,'id':43});//小四喜 
      if(gangzi==4)ans.fans.push({'val':1,'id':44});//四杠子
      if(fulucnt==0&&jiulian[0]==1&&!equaltile(lsttile,jiulian[1])&&!tianhu)ans.fans.push({'val':1,'id':45});//九莲宝灯 
      if(fulucnt==0&&jiulian[0]==1&&(equaltile(lsttile,jiulian[1])||tianhu))ans.fans.push({'val':2,'id':47});//纯正九莲宝灯
      if(fulucnt==0&&anke==4&&(typecnt[tiletoint(lsttile)][0]==7||tianhu))ans.fans.push({'val':2,'id':48});//四暗刻单骑 
      if(typecnt[28][1]+typecnt[29][1]+typecnt[30][1]+typecnt[31][1]==8){
        ans.fans.push({'val':2,'id':50});//大四喜 
        let fulusixicnt=0;
        for(let i=0;i<fulu[seat].length;i++){
          let type=fulu[seat][i].type,tile=tiletoint(fulu[seat][i].tile[0]);
          if((type==1||type==2||type==3)&&(tile==28||tile==29||tile==30||tile==31)){
            fulusixicnt++;
            if(fulusixicnt==4&&!is_xuezhandaodi()&&fulu[seat][i].from)baopai[seat]={'seat':fulu[seat][i].from,'val':2};
          }
        }
      }
      if(is_guyi()){
        if(qingyise&&duizi==7&&flag[3]){
          if(cnt2[2]>0)ans.fans.push({'val':1,'id':62});//大数邻
          if(cnt2[11]>0)ans.fans.push({'val':1,'id':60});//大车轮 
          if(cnt2[20]>0)ans.fans.push({'val':1,'id':61});//大竹林 
        }
        if(liqiinfo[seat].liqi==2&&(zimo&&paishan.length/2-14==0&&lstdrawtype==1||!zimo&&paishan.length/2-14==0))ans.fans.push({'val':1,'id':63});//石上三年 
        if(flag[0]==true&&duizi==7){
          ans=deletefan(ans,39);
          ans.fans.push({'val':2,'id':64});
        }//大七星 
      }
      if(liqiinfo[seat].kai&&!zimo&&liqiinfo[fangchong].liqi==0){
        if(liqiinfo[seat].liqi==2)ans.fans.push({'val':1,'id':18});
        if(liqiinfo[seat].liqi==1)ans.fans.push({'val':1,'id':2});
      }
      if(ans.fans.length!=0)return ans;
      //------------------------------------
      ans.yiman=false;
      if(liqiinfo[seat].liqi==2)ans.fans.push({'val':2,'id':18});//双立直
      if(liqiinfo[seat].liqi==1)ans.fans.push({'val':1,'id':2});//立直
      if(liqiinfo[seat].kai)ans.fans[0].val++;
      if(liqiinfo[seat].liqi!=0&&liqiinfo[seat].yifa!=0)ans.fans.push({'val':1,'id':30});//一发 
      if(is_guyi()){
        if(lstaction.name=="RecordDiscardTile"&&lstaction.data.is_liqi)ans.fans.push({'val':1,'id':51});//燕返 
        if(!zimo&&lstdrawtype==0)ans.fans.push({'val':1,'id':52});//杠振 
        if(fulucnt==4)ans.fans.push({'val':1,'id':53});//十二落抬 
      }
      if(fulucnt==0&&zimo)ans.fans.push({'val':1,'id':1});//门前清自摸和 
      if(lstaction.name=="RecordAnGangAddGang")ans.fans.push({'val':1,'id':3});//抢杠 
      if(zimo&&lstdrawtype==0)ans.fans.push({'val':1,'id':4});//岭上开花 
      if(zimo&&paishan.length/2-14==0&&lstdrawtype==1)ans.fans.push({'val':1,'id':5});//海底捞月 
      if(!zimo&&paishan.length/2-14==0)ans.fans.push({'val':1,'id':6});//河底捞鱼
      if(typecnt[32][1]==2)ans.fans.push({'val':1,'id':7});//白 
      if(typecnt[33][1]==2)ans.fans.push({'val':1,'id':8});//发 
      if(typecnt[34][1]==2)ans.fans.push({'val':1,'id':9});//中
      if(typecnt[tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z")][1]==2)ans.fans.push({'val':1,'id':10});//门风 
      if(typecnt[tiletoint((chang+1).toString()+"z")][1]==2)ans.fans.push({'val':1,'id':11});//场风 
      if(flag[3]==true&&(is_shiduan()||!is_shiduan()&&fulucnt==0))ans.fans.push({'val':1,'id':12});//断幺九 
      if(beikou==1&&fulucnt==0)ans.fans.push({'val':1,'id':13});//一杯口
      if(pinghu&&fulucnt==0)ans.fans.push({'val':1,'id':14});//平和 
      if(hunquandai&&!chunquandai&&!flag[4]){
        if(fulucnt==0)ans.fans.push({'val':2,'id':15});
        else ans.fans.push({'val':1,'id':15});
      }//混全带幺九
      if(yiqi){
        if(fulucnt==0)ans.fans.push({'val':2,'id':16});
        else ans.fans.push({'val':1,'id':16});
      }//一气通贯 
      if(sanse){
        if(fulucnt==0)ans.fans.push({'val':2,'id':17});
        else ans.fans.push({'val':1,'id':17});
      }//三色同顺 
      if(sansetongke)ans.fans.push({'val':2,'id':19});//三色同刻 
      if(gangzi==3)ans.fans.push({'val':2,'id':20});//三杠子 
      if(kezi==4)ans.fans.push({'val':2,'id':21});//对对和 
      if(anke==3)ans.fans.push({'val':2,'id':22});//三暗刻 
      if(typecnt[32][1]+typecnt[33][1]+typecnt[34][1]==5)ans.fans.push({'val':2,'id':23});//小三元 
      if(flag[4]==true)ans.fans.push({'val':2,'id':24});//混老头 
      if(duizi==7)ans.fans.push({'val':2,'id':25});//七对子 
      if(is_guyi()&&wumenqi)ans.fans.push({'val':2,'id':54});//五门齐 
      if(is_guyi()&&sanlianke)ans.fans.push({'val':2,'id':55});//三连刻 
      if(chunquandai){
        if(fulucnt==0)ans.fans.push({'val':3,'id':26});
        else ans.fans.push({'val':2,'id':26});
      }//纯全带幺九
      if(hunyise&&!qingyise){
        if(fulucnt==0)ans.fans.push({'val':3,'id':27});
        else ans.fans.push({'val':2,'id':27});
      }//混一色 
      if(is_guyi()&&santongshun){
        ans=deletefan(ans,13);
        if(fulucnt==0)ans.fans.push({'val':3,'id':56});
        else ans.fans.push({'val':2,'id':56});
      }//一色三同顺 
      if(beikou==2&&fulucnt==0)ans.fans.push({'val':3,'id':28});//两杯口
      if(qingyise){
        if(fulucnt==0)ans.fans.push({'val':6,'id':29});
        else ans.fans.push({'val':5,'id':29});
      }//清一色 
      if(is_guyi()==2){
        if(zimo&&paishan.length/2-14==0&&lstdrawtype==1&&lsttile=="1p"){
          ans=deletefan(ans,5);
          ans.fans.push({'val':5,'id':57});//一筒摸月 
        }
        if(!zimo&&paishan.length/2-14==0&&lsttile=="9p"){
          ans=deletefan(ans,6);
          ans.fans.push({'val':5,'id':58});//九筒捞鱼 
        }
      }
      if(calcsudian(ans)==-2000)return ans;
      if(alldoras[0]!=0)ans.fans.push({'val':alldoras[0],'id':31});//宝牌 
      if(alldoras[1]!=0)ans.fans.push({'val':alldoras[1],'id':32});//红宝牌 
      if(alldoras[2]!=0)ans.fans.push({'val':alldoras[2],'id':34});//北宝牌 
      if(liqiinfo[seat].liqi!=0)ans.fans.push({'val':alldoras[3],'id':33});//里宝牌 
      //--------------------------------------------------
      if(duizi==7){
        ans.fu=25;
        return ans;
      }//七对子固定符数 
      ans.fu=20;//符底 
      if(!pinghu)ans.fu+=tingpaifu;//听牌型符
      for(let i=1;i<=34;i++){
        if(i==1||i==9||i==10||i==18||i==19||i==27||i>=28&&i<=34){
          if(typecnt[i][0]==1)ans.fu+=4;
          if(typecnt[i][0]==2)ans.fu+=16;
          if(typecnt[i][0]==3)ans.fu+=32;
          if(typecnt[i][0]==6)ans.fu+=8;
        }
        else{
          if(typecnt[i][0]==1)ans.fu+=2;
          if(typecnt[i][0]==2)ans.fu+=8;
          if(typecnt[i][0]==3)ans.fu+=16;
          if(typecnt[i][0]==6)ans.fu+=4;
        }
        if(typecnt[i][0]==7){
          if(i==tiletoint(((seat-ju+playercnt)%playercnt+1).toString()+"z"))ans.fu+=2;
          if(i==tiletoint((chang+1).toString()+"z"))ans.fu+=2;
          if(i==32||i==33||i==34)ans.fu+=2;
        }
      }//刻子符 
      if(zimo&&!pinghu)ans.fu+=2;//自摸符 
      if(!zimo&&fulucnt==0)ans.fu+=10;//门前清荣和符 
      ans.fu=Math.ceil(ans.fu/10)*10;
      if(fulucnt!=0&&ans.fu==20)ans.fu=30;
      //--------------------------------------------------
      return ans;
    }
    for(let i=partitiontmp.length-1;i>=0;i--){
      let tile=partitiontmp[i].tile,type=partitiontmp[i].type;
      if(type==5&&(equaltile(tile[0],lsttile)||equaltile(tile[1],lsttile)||equaltile(tile[2],lsttile))){
        if(!zimo)partitiontmp[i].type=0;
        let midtile=inttotile((tiletoint(tile[0])+tiletoint(tile[1])+tiletoint(tile[2]))/3);
        if(equaltile(midtile,lsttile))updateret(calc0(2));//坎张听符 
        else if(tiletoint(lsttile)%9==3&&tiletoint(midtile)%9==2)updateret(calc0(2));//边张听符 
        else if(tiletoint(lsttile)%9==7&&tiletoint(midtile)%9==8)updateret(calc0(2));//边张听符 
        else updateret(calc0(0));
        partitiontmp[i].type=5;
      }
      if(type==6&&equaltile(tile[0],lsttile)){
        if(!zimo)partitiontmp[i].type=1;
        updateret(calc0(0));
        partitiontmp[i].type=6;
      }
      if(type==7&&equaltile(tile[0],lsttile))updateret(calc0(2));//单骑符 
    }
  }
  function dfs(now){
    if(now==35){
      if(partition.length==7||partition.length==5)calc();
      return;
    }
    if(cnt[now]==0){
      dfs(now+1);
      return;
    }
    let whatever=[0,2,3];
    for(let k=0;k<3;k++){
      if(cnt[now]<whatever[k])continue;
      cnt[now]-=whatever[k];
      let cnt0=cnt[now];
      if(k==1)partition.push({'type':7,'tile':[inttotile(now),inttotile(now)]});
      else if(k==2)partition.push({'type':6,'tile':[inttotile(now),inttotile(now),inttotile(now)]});
      if(cnt[nxt2[now]]>=cnt0&&cnt[nxt2[nxt2[now]]]>=cnt0){
        cnt[now]-=cnt0;
        cnt[nxt2[now]]-=cnt0;
        cnt[nxt2[nxt2[now]]]-=cnt0;
        for(let i=1;i<=cnt0;i++)partition.push({'type':5,'tile':[inttotile(now),inttotile(nxt2[now]),inttotile(nxt2[nxt2[now]])]});
        dfs(now+1);
        cnt[now]+=cnt0;
        cnt[nxt2[now]]+=cnt0;
        cnt[nxt2[nxt2[now]]]+=cnt0;
        for(let i=1;i<=cnt0;i++)partition.length=partition.length-1;
      }
      if(k==1||k==2)partition.length=partition.length-1;
      cnt[now]+=whatever[k];
    }
  }
  dfs(1);
  if(calchupai(tls)==3){
    let tianhu=false;
    let ans={'yiman':true,'fans':[],'fu':0};
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat==ju&&zimo){ans.fans.push({'val':1,'id':35});tianhu=true;}//天和 
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&zimo)ans.fans.push({'val':1,'id':36});//地和 
    if(liqiinfo[seat].yifa!=0&&liqiinfo[seat].liqi==0&&seat!=ju&&!zimo&&is_guyi())ans.fans.push({'val':1,'id':59});//人和 
    if(fulucnt==0&&cnt[tiletoint(lsttile)]==1&&!tianhu)ans.fans.push({'val':1,'id':42});//国士无双 
    if(fulucnt==0&&(cnt[tiletoint(lsttile)]==2||tianhu))ans.fans.push({'val':2,'id':49});//国士无双十三面 
    updateret(ans);
  }
  return ret;
}
function calcxun(){
  for(let x=0;x<playercnt;x++)if(playertiles[x].length%3==2&&!hupaied[x])xun[x].push(actions.length-1);
}
function calcdoras(){
  doracnt.cnt=Math.min(doracnt.cnt,5);
  if(is_chuanma())doracnt.cnt=0;
  let doras0=[];
  for(let i=0;i<doracnt.cnt;i++)doras0[i]=doras[i];
  return doras0;
}
function gamebegin(){
  try{
    if(unsafeWindow.editdata!=null){editdata=unsafeWindow.editdata;unsafeWindow.editdata=null;}
    if(unsafeWindow.settings!=null){settings=unsafeWindow.settings;unsafeWindow.settings=null;}
  }catch(e){};
  if(editdata.config==undefined)
    editdata.config={
      'category':2,
      'meta':{'mode_id':5},
      'mode':{
        'mode':1,
      }
    }
  if(settings.chuanma_points_method==undefined)settings.chuanma_points_method=0;
  if(editdata.player_datas==undefined)editdata.player_datas=[];
  config=editdata.config;
  if(config.mode.mode>=11&&config.mode.mode<=20){
    if(is_guyi())config.mode.detail_rule.guyi_mode=0;
    if(is_xuezhandaodi())config.mode.detail_rule.xuezhandaodi=0;
    if(is_huansanzhang())config.mode.detail_rule.huansanzhang=0;
    if(is_muyu())config.mode.detail_rule.muyu_mode=0;
    if(is_dora3())config.mode.detail_rule.dora3_mode=0;
  }
  if(config.mode.mode>=21)playercnt=2;
  else if(config.mode.mode>=11&&config.mode.mode<=20)playercnt=3;
  else playercnt=4;
  if(config.mode&&config.mode.detail_rule&&config.mode.detail_rule.open_hand==1)config.mode.detail_rule.open_hand="1111";
  if(config.mode.mode>=21){
    if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.init_point)scores=[config.mode.detail_rule.init_point,config.mode.detail_rule.init_point];
    else scores=[50000,50000];
  }
  else if(config.mode.mode>=11&&config.mode.mode<=20){
    if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.init_point)scores=[config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point];
    else scores=[35000,35000,35000];
  }
  else{
    if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.init_point)scores=[config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point,config.mode.detail_rule.init_point];
    else{
      if(is_chuanma())scores=[50000,50000,50000,50000];
      else if(is_muyu())scores=[40000,40000,40000,40000];
      else if(is_dora3())scores=[35000,35000,35000,35000];
      else scores=[25000,25000,25000,25000];
    }
  }
  firstneededscores=scores[0];
  edit_online();
}
function addNewRound(chang,ju,ben,doras,left_tile_count,liqibang,md5,paishan,scores,tiles0,tiles1,tiles2,tiles3,tingpai){
  function mingpai_data(tiles,seat){
    let ret={'count':[],'seat':seat,'tiles':[]}
    let cnt=[];
    for(let i=1;i<=37;i++)cnt[i]=0;
    for(let i=0;i<tiles.length;i++)cnt[tiletoint(tiles[i],1)]++;
    for(let i=1;i<=37;i++){
      if(cnt[i]==0)continue;
      ret.tiles.push(inttotile(i,1));
      ret.count.push(cnt[i]);
    }
    for(let i=1;i<=37;i++)mingpais[seat][inttotile(i,1)]=cnt[i];
    return ret;
  }
  let ret={
    'name':"RecordNewRound",
    'data':{
      'chang':chang,
      'ju':ju,
      'ben':ben,
      'left_tile_count':left_tile_count,
      'liqibang':liqibang,
      'md5':md5,
      'paishan':paishan,
      'scores':[].concat(scores),
      'tiles0':[].concat(tiles0),
      'tiles1':[].concat(tiles1),
      'tiles2':[].concat(tiles2),
      'tiles3':[].concat(tiles3)
    }
  };
  if(is_huansanzhang()||is_chuanma())ret.data.operations=[{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles0[0],tiles0[1],tiles0[2]],
      'type':12
    }],
    'seat':0
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles1[0],tiles1[1],tiles1[2]],
      'type':12
    }],
    'seat':1
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles2[0],tiles2[1],tiles2[2]],
      'type':12
    }],
    'seat':2
  },{
    'operation_list':[{
      'change_tile_states':[0,0,0],
      'change_tiles':[tiles3[0],tiles3[1],tiles3[2]],
      'type':12
    }],
    'seat':3
  }];
  ret.data.opens=[];
  if(is_peipaimingpai()||is_openhand(0))ret.data.opens.push(mingpai_data(tiles0,0));
  if(is_peipaimingpai()||is_openhand(1))ret.data.opens.push(mingpai_data(tiles1,1));
  if(is_peipaimingpai()||is_openhand(2))ret.data.opens.push(mingpai_data(tiles2,2));
  if(is_peipaimingpai()||is_openhand(3))ret.data.opens.push(mingpai_data(tiles3,3));
  
  if(is_chuanma())ret.data.ju_count=editdata.actions.length;
  if(tingpai!=undefined&&tingpai!=[])ret.data.tingpai=tingpai;
  if(!is_xuezhandaodi()&&!is_chuanma()){
    if(typeof(doras)=="string")ret.data.dora=doras;
    else ret.data.doras=doras;
  }
  if(is_muyu()){
    get_muyu("new");
    ret.data.muyu={
      'count_max':5,
      'count':muyu.count,
      'id':muyu.id,
      'seat':muyu.seat
    }
    update_muyu();
  }
  actions.push(ret);
  calcxun();
  edit_online();
}
function roundbegin(){
  try{
    if(editdata.actions.length==0)gamebegin();
    if(is_chuanma()&&juc!=-1){ju=juc;juc=-1;}
    if(ju==playercnt){chang++;ju=0;}
    if(chang==playercnt)chang=0;
    init();
    benchangbang=ben;
    let lsttile=playertiles[ju][playertiles[ju].length-1];
    playertiles[ju].length--;
    let tingpais=[];
    for(let i=0;i<playercnt;i++){
      let tingpaitmp=tingpai(i);
      if(tingpaitmp.length!=0)tingpais.push({'seat':i,'tingpais1':tingpaitmp});
    }
    playertiles[ju].push(lsttile);
    if(is_dora3())doracnt.cnt=3;
    if(playercnt==2)addNewRound(chang,ju,ben,calcdoras(),paishan.length/2-18,liqibang,md5(paishan),paishan,[].concat(scores),[].concat(tiles0),[].concat(tiles1),[].concat(tiles2),[].concat(tiles3),tingpais);
    else if(!is_chuanma())addNewRound(chang,ju,ben,calcdoras(),paishan.length/2-14,liqibang,md5(paishan),paishan,[].concat(scores),[].concat(tiles0),[].concat(tiles1),[].concat(tiles2),[].concat(tiles3),tingpais);
    else addNewRound(chang,ju,ben,calcdoras(),paishan.length/2,liqibang,md5(paishan),paishan,[].concat(scores),[].concat(tiles0),[].concat(tiles1),[].concat(tiles2),[].concat(tiles3),tingpais);
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function addDiscardTile(is_liqi,is_wliqi,doras,moqie,seat,tile,tingpais,tile_state,is_kailiqi){ 
  for(let i=0;i<playertiles[seat].length;i++){
    if(playertiles[seat][i]==tile){
      playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat].length--;
      break;
    }
  }
  let ret={
    'name':"RecordDiscardTile",
    'data':{
      'is_liqi':is_liqi,
      'is_wliqi':is_wliqi,
      'doras':doras,
      'moqie':moqie,
      'seat':seat,
      'tile':tile,
      'tingpais':tingpai(seat)
    }
  };
  if(is_muyu()){
    if(seat==muyu.seat)get_muyu("countdown");
    ret.data.muyu={
      'count_max':5,
      'count':muyu.count,
      'id':muyu.id,
      'seat':muyu.seat
    }
    update_muyu();
    if(muyu.count==0)get_muyu("new");
  }
  if(tile_state!=undefined)ret.data.tile_state=tile_state;
  if(is_kailiqi)ret.data.is_kailiqi=true;
  actions.push(ret);
  calcxun();
  edit_online();
}
function addDealTile(doras,left_tile_count,seat,tile,liqi,tile_state){
  playertiles[seat].push(tile);
  let ret={
    'name':"RecordDealTile",
    'data':{
      'doras':doras,
      'left_tile_count':left_tile_count,
      'seat':seat,
      'tile':tile,
    }
  };
  if(tile_state!=undefined)ret.data.tile_state=tile_state;
  if(liqi!=undefined&&liqi!=0)ret.data.liqi=liqi;
  if(is_muyu()){
    if(muyu.seat==seat)ret.data.muyu={
      'count_max':5,
      'count':muyu.count,
      'id':muyu.id,
      'seat':muyu.seat
    }
    update_muyu();
  }
  actions.push(ret);
  calcxun();
  edit_online();
}
function addChiPengGang(froms,seat,tiles,type,liqi,tile_states){
  for(let j=0;j<tiles.length;j++){
    for(let i=0;i<playertiles[seat].length;i++){
      if(playertiles[seat][i]==tiles[j]){
        playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
        playertiles[seat].length--;
        break;
      }
    }
  }
  let ret={
    'name':"RecordChiPengGang",
    'data':{
      'froms':froms,
      'seat':seat,
      'tiles':tiles,
      'type':type
    }  
  };
  if(liqi!=undefined&&liqi!=0)ret.data.liqi=liqi;
  if(tile_states!=undefined&&tile_states!=[])ret.data.tile_states=tile_states;
  if(is_muyu()){
    if(muyu.seat==seat)ret.data.muyu={
      'count_max':5,
      'count':muyu.count,
      'id':muyu.id,
      'seat':muyu.seat
    }
    update_muyu();
  }
  actions.push(ret);
  calcxun();
  edit_online();
}
function addAnGangAddGang(doras,seat,tiles,type,tile_states){
  if(type!=3){
    for(let i=0;i<playertiles[seat].length;i++){
      if(equaltile(playertiles[seat][i],tiles)){
        playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
        playertiles[seat].length--;
        break;
      }
    }
  }
  else{
    for(let j=1;j<=4;j++){
      for(let i=0;i<playertiles[seat].length;i++){
        if(equaltile(playertiles[seat][i],tiles)){
          playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
          playertiles[seat].length--;
          break;
        }
      }
    }
  }
  let ret={
    'name':"RecordAnGangAddGang",
    'data':{
      'doras':doras,
      'seat':seat,
      'tiles':tiles,
      'type':type
    }
  };
  if(tile_states)ret.data.tile_states=tile_states;
  actions.push(ret);
  calcxun();
  edit_online();
}
function addBaBei(doras,seat,moqie,tile,tile_states){
  if(typeof(moqie)=="string"){tile=moqie;moqie=undefined;}
  if(tile==undefined)tile="4z";
  if(moqie==undefined){
    if(playertiles[seat][playertiles[seat].length-1]==tile)moqie=true;
    else moqie=false;
  }
  for(let i=0;i<playertiles[seat].length;i++){
    if(playertiles[seat][i]==tile){
      playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat].length--;
      break;
    }
  }
  let ret={
    'name':"RecordBaBei",
    'data':{
      'doras':doras,
      'moqie':moqie,
      'seat':seat,
      'tile':tile
    }
  };
  if(tile_states!=undefined)ret.data.tile_states;
  actions.push(ret);
  calcxun();
  edit_online();
}
function cmp(x,y){
  return tiletoint(x)-tiletoint(y);
}
function hupaioneplayer_chuanma(seat){
  function qieshang(x){
    return Math.ceil(x/100)*100;
  }
  let lstaction=getlstaction(),zimo=false;
  if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")playertiles[seat].sort(cmp);
  if(lstaction.name=="RecordDealTile"||lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")zimo=true;
  else if(lstaction.name=="RecordDiscardTile")playertiles[seat].push(lstaction.data.tile);
  else if(lstaction.name=="RecordAnGangAddGang")playertiles[seat].push(lstaction.data.tiles);
  else if(lstaction.name=="RecordBaBei")playertiles[seat].push(lstaction.data.tile);
  let fangchong;
  if(!zimo)fangchong=lstaction.data.seat;
  let ming=[];
  for(let i=0;i<fulu[seat].length;i++){
    let tiles=fulu[seat][i].tile;
    if(fulu[seat][i].type==0)ming.push("shunzi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==1)ming.push("kezi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==2)ming.push("minggang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
    else if(fulu[seat][i].type==3)ming.push("angang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
  }
  let hand=[].concat(playertiles[seat]),hu_tile;
  hu_tile=hand[hand.length-1];
  hand.length--;
  hand.sort(cmp);
  //-------------------------------------------
  let points={
    'fans':calcfan_chuanma(playertiles[seat],seat,zimo)
  };
  let val=0;
  for(let i=0;i<points.fans.length;i++)val=val+points.fans[i].val;
  //-------------------------------------------
  let sudian=calcsudian_chuanma(points.fans);
  let zhahu=false;
  if(calchupai(playertiles[seat])==0||huazhu(seat))zhahu=true;
  if(calchupai(playertiles[seat])!=3&&lstaction.name=="RecordAnGangAddGang"&&lstaction.data.type==3)zhahu=true;
  let point_rong=0,point_sum=0,point_zimo_qin=0,point_zimo_xian=0;
  if(zhahu){
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      delta_scores[i]-=-33000;
      delta_scores[seat]+=-33000;
    }
    let ret={
      'count':val,
      'doras':[],
      'li_doras':[],
      'dadian':-delta_scores[seat],
      'fans':[],
      'fu':20,
      'hand':hand,
      'hu_tile':hu_tile,
      'ming':ming,
      'liqi':false,
      'qinjia':false,
      'seat':seat,
      'title_id':0,
      'yiman':false,
      'zimo':zimo,
    }
    playertiles[seat].length--;
    return ret;
  }
  if(zimo){
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      delta_scores[i]-=sudian+1000;
      delta_scores[seat]+=sudian+1000;
    }
  }
  else{
    delta_scores[fangchong]-=sudian;
    delta_scores[seat]+=sudian;
  }
  let dadian=Math.max(delta_scores[seat],-delta_scores[seat]);
  //---------------------------------------------------
  let ret={
    'count':val,
    'doras':[],
    'li_doras':[],
    'dadian':dadian,
    'fans':points.fans,
    'fu':20,
    'hand':hand,
    'hu_tile':hu_tile,
    'ming':ming,
    'liqi':false,
    'qinjia':false,
    'seat':seat,
    'title_id':0,
    'yiman':false,
    'zimo':zimo,
  }
  playertiles[seat].length--;
  return ret;
}
function hupaioneplayer(seat){
  function qieshang(x){
    return Math.ceil(x/100)*100;
  }
  let lstaction=getlstaction(),zimo=false;
  if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")playertiles[seat].sort(cmp);
  if(lstaction.name=="RecordDealTile"||lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")zimo=true;
  else if(lstaction.name=="RecordDiscardTile")playertiles[seat].push(lstaction.data.tile);
  else if(lstaction.name=="RecordAnGangAddGang")playertiles[seat].push(lstaction.data.tiles);
  else if(lstaction.name=="RecordBaBei")playertiles[seat].push(lstaction.data.tile);
  let fangchong;
  if(!zimo)fangchong=lstaction.data.seat;
  let doras0=[];
  for(let i=0;i<doracnt.cnt;i++)doras0[i]=doras[i];
  let li_doras0=[];
  if(liqiinfo[seat].liqi!=0)for(let i=0;i<doracnt.cnt;i++)li_doras0[i]=li_doras[i];
  let ming=[];
  for(let i=0;i<fulu[seat].length;i++){
    let tiles=fulu[seat][i].tile;
    if(fulu[seat][i].type==0)ming.push("shunzi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==1)ming.push("kezi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
    else if(fulu[seat][i].type==2)ming.push("minggang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
    else if(fulu[seat][i].type==3)ming.push("angang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
  }
  let hand=[].concat(playertiles[seat]),hu_tile;
  hu_tile=hand[hand.length-1];
  hand.length--;
  hand.sort(cmp);
  //------------------------------
  let qinjia;
  if(seat==ju)qinjia=true;
  else qinjia=false;
  let liqi;
  if(liqiinfo[seat].liqi!=0)liqi=true;
  else liqi=false;
  //-------------------------------------------
  let points=calcfan(playertiles[seat],seat,zimo,fangchong);
  let val=0,title_id=0;
  for(let i=0;i<points.fans.length;i++)val=val+points.fans[i].val;
  if(points.yiman==false&&val==5||calcsudian(points)==2000)title_id=1;
  if(points.yiman==false&&(val==6||val==7))title_id=2;
  if(points.yiman==false&&(val==8||val==9||val==10))title_id=3;
  if(points.yiman==false&&(val==11||val==12))title_id=4;
  if(points.yiman==false&&val>=13)title_id=11;
  if(points.yiman==true)title_id=val+4;
  //-------------------------------------------
  let sudian=calcsudian(points);
  let zhahu=false;
  if(calchupai(playertiles[seat])==0||sudian==-2000)zhahu=true;
  if(calchupai(playertiles[seat])!=3&&lstaction.name=="RecordAnGangAddGang"&&lstaction.data.type==3)zhahu=true;
  let point_rong=0,point_sum=0,point_zimo_qin=0,point_zimo_xian=0;
  if(qinjia){
    point_rong=6*sudian;
    point_zimo_qin=2*sudian;//not needed
    point_zimo_xian=2*sudian;
    if(playercnt==3&&have_zimosun()==false)point_zimo_xian=3*sudian;
    if(playercnt==2&&have_zimosun()==false)point_zimo_xian=6*sudian;
    if(playercnt==3&&have_zimosun())point_sum=4*sudian;
    else if(playercnt==2&&have_zimosun())point_sum=2*sudian;
    else point_sum=6*sudian;
  }
  else{
    point_rong=4*sudian;
    point_zimo_qin=2*sudian;
    point_zimo_xian=sudian;
    if(playercnt==3&&have_zimosun()==false){
      point_zimo_qin=sudian*5/2;
      point_zimo_xian=sudian*3/2;
    }
    if(playercnt==2&&have_zimosun()==false){
      point_zimo_qin=6*sudian;
      point_zimo_xian=0;
    }
    if(playercnt==3&&have_zimosun())point_sum=3*sudian;
    else if(playercnt==2&&have_zimosun())point_sum=2*sudian;
    else point_sum=4*sudian;
  }
  point_rong=qieshang(point_rong);
  point_sum=qieshang(point_sum);
  point_zimo_qin=qieshang(point_zimo_qin);
  point_zimo_xian=qieshang(point_zimo_xian);
  if(zhahu){
    if(qinjia){
      point_rong=12000;
      point_zimo_qin=4000;//not needed
      point_zimo_xian=4000;
      if(playercnt==3&&have_zimosun()==false){
        point_zimo_qin=6000;
        point_zimo_xian=6000;
      }
      if(playercnt==2&&have_zimosun()==false){
        point_zimo_qin=12000;
        point_zimo_xian=12000;
      }
      if(playercnt==3&&have_zimosun())point_sum=8000;
      else if(playercnt==2&&have_zimosun())point_sum=4000;
      else point_sum=12000;
    }
    else{
      point_rong=8000;
      point_zimo_qin=4000;
      point_zimo_xian=2000;
      if(playercnt==3&&have_zimosun()==false){
        point_zimo_qin=5000;
        point_zimo_xian=3000;
      }
      if(playercnt==2&&have_zimosun()==false){
        point_zimo_qin=8000;
        point_zimo_xian=8000;
      }
      if(playercnt==3&&have_zimosun())point_sum=6000;
      else if(playercnt==2&&have_zimosun())point_sum=4000;
      else point_sum=8000;
    }
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      if(i==ju||seat==ju){
        delta_scores[i]-=qieshang(-4000)*muyutimes[i]*muyutimes[seat];
        delta_scores[seat]+=qieshang(-4000)*muyutimes[i]*muyutimes[seat];
      }
      else{
        delta_scores[i]-=qieshang(-2000)*muyutimes[i]*muyutimes[seat];
        delta_scores[seat]+=qieshang(-2000)*muyutimes[i]*muyutimes[seat];
      }
    }
    if(playercnt==3&&have_zimosun()==false){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(seat==ju){
          delta_scores[i]-=qieshang(-2000)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(-2000)*muyutimes[i]*muyutimes[seat];
        }
        else{
          delta_scores[i]-=qieshang(-1000)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(-1000)*muyutimes[i]*muyutimes[seat];
        }
      }
    }
    if(playercnt==2&&have_zimosun()==false){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(seat==ju){
          delta_scores[i]-=qieshang(-8000)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(-8000)*muyutimes[i]*muyutimes[seat];
        }
        else{
          delta_scores[i]-=qieshang(-4000)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(-4000)*muyutimes[i]*muyutimes[seat];
        }
      }
    }
    let ret={
      'count':0,
      'doras':doras0,
      'li_doras':li_doras0,
      'fans':[],
      'fu':0,
      'hand':hand,
      'hu_tile':hu_tile,
      'liqi':liqi,
      'ming':ming,
      'point_rong':point_rong,
      'point_sum':point_sum,
      'point_zimo_qin':point_zimo_qin,
      'point_zimo_xian':point_zimo_xian,
      'qinjia':qinjia,
      'seat':seat,
      'title_id':1,
      'yiman':false,
      'zimo':zimo,
    }
    playertiles[seat].length--;
    if(is_xuezhandaodi()||playercnt==2)ret.dadian=-delta_scores[seat];
    return ret;
  }
  if(baopai[seat]!=undefined){
    if(zimo){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(i==ju||seat==ju){
          delta_scores[baopai[seat].seat]-=baopai[seat].val*16000*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=baopai[seat].val*16000*muyutimes[i]*muyutimes[seat];
        }
        else{
          delta_scores[baopai[seat].seat]-=baopai[seat].val*8000*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=baopai[seat].val*8000*muyutimes[i]*muyutimes[seat];
        }
      }
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(i==ju||seat==ju){
          delta_scores[i]-=(val-baopai[seat].val)*16000*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=(val-baopai[seat].val)*16000*muyutimes[i]*muyutimes[seat];
        }
        else{
          delta_scores[i]-=(val-baopai[seat].val)*8000*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=(val-baopai[seat].val)*8000*muyutimes[i]*muyutimes[seat];
        }
      }
      if(playercnt==3&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(i==seat||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=(val-baopai[seat].val)*8000*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=(val-baopai[seat].val)*8000*muyutimes[i]*muyutimes[seat];
          }
          else{
            delta_scores[i]-=(val-baopai[seat].val)*4000*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=(val-baopai[seat].val)*4000*muyutimes[i]*muyutimes[seat];
          }
        }
      }
      if(playercnt==2&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(i==seat||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=(val-baopai[seat].val)*32000*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=(val-baopai[seat].val)*32000*muyutimes[i]*muyutimes[seat];
          }
          else{
            delta_scores[i]-=(val-baopai[seat].val)*16000*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=(val-baopai[seat].val)*16000*muyutimes[i]*muyutimes[seat];
          }
        }
      }
    }
    else{
      if(qinjia){
        delta_scores[baopai[seat].seat]-=baopai[seat].val*24000*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=baopai[seat].val*24000*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[fangchong]-=(val*48000-baopai[seat].val*24000)*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=(val*48000-baopai[seat].val*24000)*muyutimes[fangchong]*muyutimes[seat];
      }
      else{
        delta_scores[baopai[seat].seat]-=baopai[seat].val*16000*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=baopai[seat].val*16000*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[fangchong]-=(val*32000-baopai[seat].val*16000)*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=(val*32000-baopai[seat].val*16000)*muyutimes[fangchong]*muyutimes[seat];
      }
    }
  }
  else{
    if(zimo){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        if(i==ju||seat==ju){
          delta_scores[i]-=qieshang(sudian*2)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(sudian*2)*muyutimes[i]*muyutimes[seat];
        }
        else{
          delta_scores[i]-=qieshang(sudian)*muyutimes[i]*muyutimes[seat];
          delta_scores[seat]+=qieshang(sudian)*muyutimes[i]*muyutimes[seat];
        }
      }
      if(playercnt==3&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(i==seat||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=qieshang(sudian)*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=qieshang(sudian)*muyutimes[i]*muyutimes[seat];
          }
          else{
            delta_scores[i]-=qieshang(sudian/2)*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=qieshang(sudian/2)*muyutimes[i]*muyutimes[seat];
          }
        }
      }
      if(playercnt==2&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(i==seat||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=qieshang(sudian*4)*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=qieshang(sudian*4)*muyutimes[i]*muyutimes[seat];
          }
          else{
            delta_scores[i]-=qieshang(sudian*2)*muyutimes[i]*muyutimes[seat];
            delta_scores[seat]+=qieshang(sudian*2)*muyutimes[i]*muyutimes[seat];
          }
        }
      }
    }
    else{
      if(qinjia){
        delta_scores[fangchong]-=qieshang(6*sudian)*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=qieshang(6*sudian)*muyutimes[fangchong]*muyutimes[seat];
      }
      else{
        delta_scores[fangchong]-=qieshang(4*sudian)*muyutimes[fangchong]*muyutimes[seat];
        delta_scores[seat]+=qieshang(4*sudian)*muyutimes[fangchong]*muyutimes[seat];
      }
    }
  }
  let dadian=Math.max(delta_scores[seat],-delta_scores[seat]);
  if(baopai[seat]!=undefined){
    if(zimo&&val-baopai[seat].val!=0){
      for(let i=0;i<playercnt;i++){
        if(i==seat||hupaied[i])continue;
        delta_scores[i]-=100*benchangbang;
        delta_scores[seat]+=100*benchangbang;
      }
    }
    else{
      delta_scores[baopai[seat].seat]-=(playercnt-1)*100*benchangbang;
      delta_scores[seat]+=(playercnt-1)*100*benchangbang;
    }
  }
  else if(zimo){
    for(let i=0;i<playercnt;i++){
      if(i==seat||hupaied[i])continue;
      delta_scores[i]-=100*benchangbang;
      delta_scores[seat]+=100*benchangbang;
    }
  }
  else{
    delta_scores[fangchong]-=(playercnt-1)*100*benchangbang;
    delta_scores[seat]+=(playercnt-1)*100*benchangbang;
  }
  benchangbang=0;
  delta_scores[seat]+=liqibang*1000;
  liqibang=0;
  //---------------------------------------------------
  let ret={
    'count':val,
    'doras':doras0,
    'li_doras':li_doras0,
    'fans':points.fans,
    'fu':points.fu,
    'hand':hand,
    'hu_tile':hu_tile,
    'liqi':liqi,
    'ming':ming,
    'point_rong':point_rong,
    'point_sum':point_sum,
    'point_zimo_qin':point_zimo_qin,
    'point_zimo_xian':point_zimo_xian,
    'qinjia':qinjia,
    'seat':seat,
    'title_id':title_id,
    'yiman':points.yiman,
    'zimo':zimo,
  }
  if(is_xuezhandaodi()||playercnt==2)ret.dadian=dadian;
  playertiles[seat].length--;
  return ret;
}
function endHule(HuleInfo,old_scores,delta_scores,scores,baopai){
  actions.push({
    'name':"RecordHule",
    'data':{
      'delta_scores':[].concat(delta_scores),
      'gameend':{},
      'hules':HuleInfo,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores),
      'baopai':baopai
    }
  });
  edit_online();
}
function addHuleXueZhanMid(HuleInfo,old_scores,delta_scores,scores){
  if(!is_chuanma())for(let seat=0;seat<playercnt;seat++)liqiinfo[seat].yifa=0;//?????
  actions.push({
    'name':"RecordHuleXueZhanMid",
    'data':{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
  edit_online();
}
function addHuleXueZhanEnd(HuleInfo,old_scores,delta_scores,scores,hules_history){
  actions.push({
    'name':"RecordHuleXueZhanEnd",
    'data':{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'hules_history':hules_history,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
}
function addHuleXueLiu(HuleInfo,old_scores,delta_scores,scores){
  if(!is_chuanma())for(let seat=0;seat<playercnt;seat++)liqiinfo[seat].yifa=0;
  actions.push({
    'name':"RecordHuleXueLiu",
    'data':{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores)
    }
  });
  edit_online();
}
function addHuleXueLiuEnd(HuleInfo,old_scores,delta_scores,scores,hules_history){
  let allplayertiles=["","","",""];
  for(let seat=0;seat<playercnt;seat++){
    playertiles[seat].sort(cmp);
    for(let i=0;i<playertiles[seat].length;i++){
      allplayertiles[seat]+=playertiles[seat][i];
      if(i!=playertiles[seat].length-1)allplayertiles[seat]+="|";
    }
  }
  for(let seat=0;seat<playercnt;seat++)liqiinfo[seat].yifa=0;
  actions.push({
    'name':"RecordHuleXueLiuEnd",
    'data':{
      'delta_scores':[].concat(delta_scores),
      'hules':HuleInfo,
      'hules_history':hules_history,
      'old_scores':[].concat(old_scores),
      'scores':[].concat(scores),
      'allplayertiles':allplayertiles
    }
  });
  edit_online();
}
function hupai(x,type){
  try{
    if(chuanmagangs.notover.length!=0){
      let seat=getlstaction().data.seat,tile=getlstaction().data.tiles;
      for(let i=0;i<fulu[seat].length;i++){
        if(fulu[seat][i].type==2&&equaltile(fulu[seat][i].tile[0],tile)){
            fulu[seat][i].type=1;
            fulu[seat][i].tile.length--;
            break;
        }
      }
      chuanmagangs.notover.length=0;
    }
    if(typeof(x)=="boolean"){type=x;x=undefined;}
    if(typeof(x)=="number")x=[x];
    if(x==undefined){
      let lstaction=getlstaction();
      if(lstaction.name=="RecordDealTile")x=[lstaction.data.seat];
      else if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")x=[ju];
      else{
        x=[];
        for(let i=getlstaction().data.seat;i<playercnt+getlstaction().data.seat;i++){
          seat=i%playercnt;
          if(seat==getlstaction().data.seat||hupaied[seat])continue;
          if(lstaction.name=="RecordDiscardTile")playertiles[seat].push(lstaction.data.tile);
          else if(lstaction.name=="RecordAnGangAddGang")playertiles[seat].push(lstaction.data.tiles);
          else if(lstaction.name=="RecordBaBei")playertiles[seat].push(lstaction.data.tile);
          if(calchupai(playertiles[seat])!=0)x.push(seat);
          playertiles[seat].length=playertiles[seat].length-1;
        }
      }
    }
    if(x.length==0)return;
    if(!is_xuezhandaodi()&&!is_chuanma()&&!is_xueliu()){
      let ret=[],baopait=0;
      for(let i=0;i<x.length;i++)ret.push(hupaioneplayer(x[i]));
      for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
      for(let i=0;i<x.length;i++)if(baopai[x[i]])baopait=baopai[x[i]].seat+1;
      let old_scores=[].concat(scores);
      for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
      endHule(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores),baopait);
      delta_scores=[0,0,0,0];
      if(!is_chuanma()&&hupaied[ju])ben++;
      else if(!is_chuanma()){
        ju++;
        ben=0;
      }
      roundend();
    }
    else if((is_xuezhandaodi()||is_chuanma()||is_xueliu())&&(type==undefined||type==false)){
      let ret=[];
      for(let i=0;i<x.length;i++){
        let whatever;
        if(!is_chuanma())whatever=hupaioneplayer(x[i]);
        else whatever=hupaioneplayer_chuanma(x[i]);
        ret.push(whatever);
        inserthules_history(whatever);
      }
      if(is_chuanma()&&juc==-1)juc=x[0];
      if(!is_xueliu())for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
      let old_scores=[].concat(scores);
      for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
      if(!is_xueliu())addHuleXueZhanMid(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores));
      else addHuleXueLiu(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores));
      delta_scores=[0,0,0,0];
    } 
    else if((is_xuezhandaodi()||is_chuanma()||is_xueliu())&&type!=undefined&&type!=false){
      let ret=[];
      for(let i=0;i<x.length;i++){
        let whatever;
        if(!is_chuanma())whatever=hupaioneplayer(x[i]);
        else whatever=hupaioneplayer_chuanma(x[i]);
        ret.push(whatever);
        inserthules_history(whatever);
      }
      if(is_chuanma()&&juc==-1)juc=x[0];
      if(!is_xueliu())for(let i=0;i<x.length;i++)hupaied[x[i]]=true;
      let old_scores=[].concat(scores);
      for(let i=0;i<playercnt;i++)scores[i]=scores[i]+delta_scores[i];
      if(!is_xueliu())addHuleXueZhanEnd(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores),hules_history);
      else addHuleXueLiuEnd(ret,[].concat(old_scores),[].concat(delta_scores),[].concat(scores),hules_history);
      delta_scores=[0,0,0,0];
      if(!is_chuanma())ju++;
      roundend();
    }
    if(is_chuanma()&&!hupaied[0]&&!hupaied[1]&&!hupaied[2]&&!hupaied[3])ju=x[0];
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function addChangeTile(change_tile_infos,change_type,doras){
  for(let seat=0;seat<playercnt;seat++){
    for(let j=0;j<3;j++){
      for(let i=0;i<playertiles[seat].length;i++){
        if(playertiles[seat][i]==change_tile_infos[seat].out_tiles[j]){
          playertiles[seat][i]=playertiles[seat][playertiles[seat].length-1];
          playertiles[seat].length--;
          break;
        }
      }
    }
    for(let j=0;j<3;j++)playertiles[seat].push(change_tile_infos[seat].in_tiles[j]);
  }
  let ret={
    'name':"RecordChangeTile",
    'data':{
      'change_tile_infos':change_tile_infos,
      'change_type':change_type,
      'doras':doras
    }
  };
  let lsttile=playertiles[ju][playertiles[ju].length-1];
  playertiles[ju].length--;
  let tingpais=[];
  for(let i=0;i<playercnt;i++){
    let tingpaitmp=tingpai(i);
    if(tingpaitmp.length!=0)tingpais.push({'seat':i,'tingpais1':tingpaitmp});
  }
  if(tingpais.length!=0)ret.data.tingpai=tingpais;
  playertiles[ju].push(lsttile);
  if(is_chuanma())ret.data.operations=[{
    'operation_list':[{
      'gap_type':0,
      'type':13
    }],
    'seat':0
  },{
    'operation_list':[{
      'gap_type':0,
      'type':13
    }],
    'seat':1
  },{
    'operation_list':[{
      'gap_type':0,
      'type':13
    }],
    'seat':2
  },{
    'operation_list':[{
      'gap_type':0,
      'type':13
    }],
    'seat':3
  }];
  actions.push(ret);
  edit_online();
}
//0:逆时针  1:对家   2:顺时针 
function huansanzhang(tiles0,tiles1,tiles2,tiles3,type){
  try{
    if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
    if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
    if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
    if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
    let ret=[];
    let tiles=[tiles0,tiles1,tiles2,tiles3];
    for(let seat=0;seat<playercnt;seat++){
      ret.push({
        'out_tiles':tiles[seat],
        'in_tile_states':[0,0,0],
        'in_tiles':tiles[(seat-type-1+playercnt*2)%playercnt],
        'out_tile_states':[0,0,0],
      })
    }
    addChangeTile(ret,type,calcdoras());
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function addSelectGap(gap_types){
  let ret={
    'name':"RecordSelectGap",
    'data':{
      'gap_types':gap_types,
    }
  };
  let tingpais=[];
  for(let i=0;i<playercnt;i++){
    let tingpaitmp=tingpai(i);
    if(tingpaitmp.length!=0)tingpais.push({'seat':i,'tingpais1':tingpaitmp});
  }
  if(tingpais.length!=0)ret.data.tingpai=tingpais;
  actions.push(ret);
  edit_online();
}
//1m2s0p
function dingque(x){
  try{
    if(typeof(x)=="number")x=x.toString();
    if(typeof(x)=="string")x=x.split('');
    let ret=[];
    for(let i=0;i<x.length;i++){
      if(x[i]=="wan"||x[i]=="m"||x[i]=="1")ret.push(1);
      if(x[i]=="bing"||x[i]=="p"||x[i]=="0")ret.push(0);
      if(x[i]=="suo"||x[i]=="s"||x[i]=="2")ret.push(2);
    }
    gaps=ret;
    addSelectGap(ret);
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function addGangResult(gang_infos){
  actions.push({
    'name':"RecordGangResult",
    'data':{
      'gang_infos':gang_infos,
    }
  });
  edit_online();
}
function addGangResultEnd(gang_infos){
  actions.push({
    'name':"RecordGangResultEnd",
    'data':{
      'gang_infos':gang_infos,
    }
  });
  edit_online();
}
function calcgangpoint(type){
  try{
    let ret={
      'delta_scores':[],
      'old_scores':[].concat(scores),
      'scores':[]
    }
    if(chuanmagangs.notover.length==0)return;
    for(let i=chuanmagangs.notover.length-1;i>=0;i--){
      chuanmagangs.over.push(chuanmagangs.notover[i]);
      delta_scores[chuanmagangs.notover[i].from]-=chuanmagangs.notover[i].val;
      delta_scores[chuanmagangs.notover[i].to]+=chuanmagangs.notover[i].val;
      chuanmagangs.notover.length--;
    }
    ret.delta_scores=[].concat(delta_scores);
    for(let i=0;i<playercnt;i++){
      scores[i]=scores[i]+delta_scores[i];
      delta_scores[i]=0;
    }
    ret.scores=[].concat(scores);
    if(type==undefined||type==false)addGangResult(ret);
    else {
      ret.hules_history=hules_history;
      addGangResultEnd(ret);
    }
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function endNoTile(liujumanguan,players,scores){
  let ret={
    'name':"RecordNoTile",
    'data':{
      'gameend':false,
      'liujumanguan':liujumanguan,
      'players':players,
      'scores':scores
    }
  };
  if(hules_history.length!=0)ret.data.hules_history=hules_history;
  actions.push(ret);
  edit_online();
}
function mopai(seat){
  try{
    if(is_chuanma())calcgangpoint();
    let lstaction=getlstaction();
    if(lstaction.name=="RecordChiPengGang"||lstaction.name=="RecordBaBei"||lstaction.name=="RecordAnGangAddGang")seat=lstaction.data.seat;
    if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile"||lstaction.name=="RecordSelectGap")seat=ju;
    if(lstaction.name=="RecordDiscardTile"||lstaction.name=="RecordHuleXueZhanMid"||lstaction.name=="RecordHuleXueLiu"){
      if(lstaction.name=="RecordDiscardTile")seat=(lstaction.data.seat+1)%playercnt;
      else seat=(lstaction.data.hules[lstaction.data.hules.length-1].seat+1)%playercnt;
      while(hupaied[seat])seat=(seat+1)%playercnt;
    }
    if(doracnt.lsttype==2){
      doracnt.lsttype=0;
      doracnt.cnt++;
    }
    for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==2)liqiinfo[i].yifa=0;
    let drawcard,liqi;
    if(lstliqi!=0&&scores[lstliqi.seat]>=1000){
      liqibang=liqibang+1;
      scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
      liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1,'kai':lstliqi.kai};
      liqi={
        'liqibang':liqibang,
        'score':scores[lstliqi.seat],
        'seat':lstliqi.seat
      }
    }
    lstliqi=0;
    let tile_state;
    if(is_openhand(seat)||liqiinfo[seat].kai)tile_state=1;
    if(drawtype==1){
      if(playercnt==2)addDealTile(calcdoras(),paishan.length/2-19,seat,paishan.substring(0,2),liqi,tile_state);
      else if(!is_chuanma())addDealTile(calcdoras(),paishan.length/2-15,seat,paishan.substring(0,2),liqi,tile_state);
      else addDealTile(calcdoras(),paishan.length/2-1,seat,paishan.substring(0,2),liqi,tile_state);
      drawcard=paishan.substring(0,2);
      paishan=paishan.substring(2);
      lstdrawtype=1;
    }
    else{
      if(playercnt==2)addDealTile(calcdoras(),paishan.length/2-19,seat,paishan.substring(0,2),liqi,tile_state);
      else addDealTile(calcdoras(),paishan.length/2-15,seat,paishan.substring(paishan.length-2),liqi,tile_state);
      drawcard=paishan.substring(paishan.length-2);
      paishan=paishan.substring(0,paishan.length-2);
      lstdrawtype=0;
    }
    drawtype=1;
    saveproject();
    return drawcard;
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function qiepai(seat,kind,is_liqi){
  try{
    if(typeof(seat)=="boolean"||seat=="liqi"||seat=="kailiqi"){kind=seat;seat=undefined;}
    if(typeof(kind)=="boolean"||kind=="liqi"||kind=="kailiqi"){is_liqi=kind;kind=undefined;}
    if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1&&seat!=undefined){kind=seat;seat=undefined;}
    if(seat==undefined){
      let lstaction=getlstaction();
      if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile"||lstaction.name=="RecordSelectGap")seat=ju;
      else seat=lstaction.data.seat;
    }
    if(kind==undefined){
      if(discardtiles[seat].length!=0){
        kind=discardtiles[seat].substring(0,2);
        discardtiles[seat]=discardtiles[seat].substring(2);
        if(kind==".."||kind=="  ")kind="moqie";
      }
      else kind="moqie";
    }
    if(is_liqi==true)is_liqi="liqi";
    if(is_liqi==undefined)is_liqi=false;
    let is_wliqi=false,is_kailiqi=false;
    if(is_liqi!=false&&liqiinfo[seat].yifa!=0)is_wliqi=true;
    if(is_liqi=="liqi"){is_liqi=true;}
    else if(is_liqi=="kailiqi"){is_liqi=true;is_kailiqi=true;}
    if(is_wliqi)lstliqi={'seat':seat,'type':2,'kai':0};
    else if(is_liqi!=false)lstliqi={'seat':seat,'type':1,'kai':0};
    if(is_kailiqi)lstliqi.kai=1;
    if(doracnt.lsttype==1){
      doracnt.lsttype=0;
      doracnt.cnt++;
    }
    let flag=0,tile;
    if(kind=="moqie")flag=2;
    else if(typeof(kind)=="string")kind=[kind];
    function swap(x){
      playertiles[seat][x]=playertiles[seat][playertiles[seat].length-1];
      playertiles[seat][playertiles[seat].length-1]=tile;
      if(x==playertiles[seat].length-1)flag=2;
      else flag=1;
    }
    function intiles(x,tile){
      let cnt=[];
      for(let i=1;i<=37;i++)cnt[i]=0;
      for(let i=0;i<x.length;i++)cnt[tiletoint(x[i],1)]++;
      if(cnt[tiletoint(tile,1)]>=1)return true;
      else return false;
    }
    for(let i=playertiles[seat].length-1;i>=0;i--){
      tile=playertiles[seat][i];
      if(intiles(kind,tile)){swap(i);break;}
    }
    let lstactionname=getlstaction().name;
    let tile_state;
    if(is_openhand(seat))tile_state=1;
    if(flag==0&&kind[0]>='0'&&kind[0]<='9'){
      if(is_peipaimingpai()){tile_state=erasemingpai(kind,seat);}
      paihe[seat].tiles.push(kind);
      let abc=tiletoint(kind);
      if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
      liqiinfo[seat].yifa=0;
      if(playertiles[seat][playertiles[seat].length-1]==kind&&lstactionname!="RecordNewRound"&&lstactionname!="RecordChiPengGang")addDiscardTile(is_liqi,is_wliqi,calcdoras(),true,seat,kind,tingpai(seat),tile_state);
      else addDiscardTile(is_liqi,is_wliqi,calcdoras(),false,seat,kind,tingpai(seat),tile_state,is_kailiqi);
      saveproject();
      return 1;
    }    
    if(flag==1||lstactionname=="RecordNewRound"||lstactionname=="RecordChiPengGang"){
      let tile=playertiles[seat][playertiles[seat].length-1];
      if(is_peipaimingpai()){tile_state=erasemingpai(tile,seat);}
      paihe[seat].tiles.push(tile);
      let abc=tiletoint(tile);
      if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
      liqiinfo[seat].yifa=0;
      addDiscardTile(is_liqi,is_wliqi,calcdoras(),false,seat,tile,tingpai(seat),tile_state,is_kailiqi);
      saveproject();
      return 1;
    }
    else if(flag==2&&lstactionname!="RecordNewRound"&&lstactionname!="RecordChiPengGang"){
      let tile=playertiles[seat][playertiles[seat].length-1];
      if(is_peipaimingpai()){tile_state=erasemingpai(tile,seat);}
      paihe[seat].tiles.push(tile);
      let abc=tiletoint(tile);
      if(abc!=1&&abc!=9&&abc!=10&&abc!=18&&abc!=19&&abc!=27&&abc<=27)paihe[seat].liujumanguan=false;
      liqiinfo[seat].yifa=0;
      addDiscardTile(is_liqi,is_wliqi,calcdoras(),true,seat,tile,tingpai(seat),tile_state,is_kailiqi);
      saveproject();
      return 1;
    } 
    else return 0;
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function mingpai(seat,tiles){
  try{
    function changedora(x){
      if(x[0]=='0')return "5"+x[1];
      if(x[0]=='5'&&x[1]!='z')return "0"+x[1];
      return x;
    }
    function intiles(x,y){
      let cnt=[],cnt2=[];
      for(let i=1;i<=37;i++)cnt[i]=cnt2[i]=0;
      for(let i=0;i<x.length;i++)cnt[tiletoint(x[i],1)]++;
      for(let i=0;i<y.length;i++)cnt2[tiletoint(y[i],1)]++;
      for(let i=1;i<=37;i++)if(cnt[i]>cnt2[i])return false;
      return true;
    }
    function trying(x,seat){
      for(let seat2=0;seat2<playercnt;seat2++){
        if((seat==seat2||seat==undefined)&&intiles(x,playertiles[seat2])){
          mingpai(seat2,x);
          return true;
        }
      }
      return false;
    }
    if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1){tiles=seat;seat=undefined;}
    if(seat==undefined){
      if(tiles!=undefined&&!equaltile(tiles[0],getlstaction().data.tile))seat=(getlstaction().data.seat+1)%playercnt;
      else if(tiles!=undefined){
        for(let seat2=0;seat2<playercnt;seat2++){
          if(seat2==getlstaction().data.seat)continue;
          let cnt=[];
          for(let i=0;i<=36;i++)cnt[i]=0;
          for(let i=0;i<playertiles[seat2].length;i++)cnt[tiletoint(playertiles[seat2][i])]++;
          if(tiles.length==3&&cnt[tiletoint(tiles[0])]>=3)seat=seat2;
          if(tiles.length==2&&cnt[tiletoint(tiles[0])]>=2)seat=seat2;
        }
      }
    }
    if(typeof(tiles)=="string")tiles=separatetile(tiles);
    if(tiles==undefined){
      let lsttile=getlstaction().data.tile;
      lsttile=inttotile(tiletoint(lsttile));
      if(trying([lsttile,lsttile,lsttile],seat))return;
      if(lsttile[0]=='5'&&lsttile[1]!='z'){
        if(trying(["0"+lsttile[1],lsttile,lsttile],seat))return;
        if(trying(["0"+lsttile[1],"0"+lsttile[1],lsttile],seat))return;
      }
      if(trying([lsttile,lsttile],seat))return;
      if(lsttile[0]=='5'&&lsttile[1]!='z'){
        if(trying(["0"+lsttile[1],lsttile],seat))return;
        if(trying(["0"+lsttile[1],"0"+lsttile[1]],seat))return;
      }
      seat=(getlstaction().data.seat+1)%playercnt;
      if(lsttile[1]!='z'&&lsttile[0]!='1'&&lsttile[0]!='2'){
        if(trying([inttotile(tiletoint(lsttile)-2),inttotile(tiletoint(lsttile)-1)],seat))return;
        if(trying([changedora(inttotile(tiletoint(lsttile)-2)),inttotile(tiletoint(lsttile)-1)],seat))return;
        if(trying([inttotile(tiletoint(lsttile)-2),changedora(inttotile(tiletoint(lsttile)-1))],seat))return;
      }
      if(lsttile[1]!='z'&&lsttile[0]!='1'&&lsttile[0]!='9'){
        if(trying([inttotile(tiletoint(lsttile)-1),inttotile(tiletoint(lsttile)+1)],seat))return;
        if(trying([changedora(inttotile(tiletoint(lsttile)-1)),inttotile(tiletoint(lsttile)+1)],seat))return;
        if(trying([inttotile(tiletoint(lsttile)-1),changedora(inttotile(tiletoint(lsttile)+1))],seat))return;
      }
      if(lsttile[1]!='z'&&lsttile[0]!='8'&&lsttile[0]!='9'){
        if(trying([inttotile(tiletoint(lsttile)+1),inttotile(tiletoint(lsttile)+2)],seat))return;
        if(trying([changedora(inttotile(tiletoint(lsttile)+1)),inttotile(tiletoint(lsttile)+2)],seat))return;
        if(trying([inttotile(tiletoint(lsttile)+1),changedora(inttotile(tiletoint(lsttile)+2))],seat))return;
      }
      return;
    }
    for(let i=0;i<playercnt;i++)liqiinfo[i].yifa=0;
    let lstaction=getlstaction();
    paihe[lstaction.data.seat].liujumanguan=false;
    let from=getlstaction().data.seat,lsttile=getlstaction().data.tile;
    let liqi=0;
    if(lstliqi!=0&&scores[lstliqi.seat]>=1000){
      liqibang=liqibang+1;
      scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
      liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1,'kai':lstliqi.kai};
      liqi={
        'liqibang':liqibang,
        'score':scores[lstliqi.seat],
        'seat':lstliqi.seat
      }
    }
    lstliqi=0;
    let tile_states=[];
    if(is_peipaimingpai())for(let i=0;i<tiles.length;i++)tile_states.push(erasemingpai(tiles[i],seat));
    if(!equaltile(tiles[0],lsttile)){
      fulu[seat].push({'type':0,'tile':[tiles[0],tiles[1],lsttile],'from':from});
      addChiPengGang([from,seat,seat],seat,[lsttile,tiles[0],tiles[1]],0,liqi,tile_states);
    }
    else if(tiles.length==3){
      doracnt.lsttype=1;
      if(!is_chuanma())drawtype=0;
      else chuanmagangs.notover.push({'from':from,'to':seat,'val':2000});
      fulu[seat].push({'type':2,'tile':[tiles[0],tiles[1],tiles[2],lsttile],'from':from});
      if(from==(seat+3)%4)addChiPengGang([from,seat,seat,seat],seat,[lsttile,tiles[0],tiles[1],tiles[2]],2,liqi,tile_states);
      if(from==(seat+2)%4)addChiPengGang([seat,from,seat,seat],seat,[tiles[0],lsttile,tiles[1],tiles[2]],2,liqi,tile_states);
      if(from==(seat+1)%4)addChiPengGang([seat,seat,seat,from],seat,[tiles[0],tiles[1],tiles[2],lsttile],2,liqi,tile_states);
    }
    else{
      fulu[seat].push({'type':1,'tile':[tiles[0],tiles[1],lsttile],'from':from});
      if(from==(seat+3)%4)addChiPengGang([from,seat,seat],seat,[lsttile,tiles[0],tiles[1]],1,liqi,tile_states);
      if(from==(seat+2)%4)addChiPengGang([seat,from,seat],seat,[tiles[0],lsttile,tiles[1]],1,liqi,tile_states);
      if(from==(seat+1)%4)addChiPengGang([seat,seat,from],seat,[tiles[0],tiles[1],lsttile],1,liqi,tile_states);
    }
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
} 
function leimingpai(seat,tile,type){
  try{
    if(seat=="babei"||seat=="angang"||seat=="jiagang"){tile=seat;seat=undefined;}
    if(tile=="babei"||tile=="angang"||tile=="jiagang"){type=tile;tile=undefined;}
    if(seat!=0&&seat!=1&&seat!=2&&seat!=playercnt-1){tile=seat;seat=undefined;}
    if(type=="baxi")type="babei";
    if(tile==undefined){
      if(leimingpai("4z","babei"))return true;
      if(leimingpai("3z","babei"))return true;
      for(let i=1;i<=34;i++)if(leimingpai(inttotile(i),"angang"))return true;
      for(let i=1;i<=34;i++)if(leimingpai(inttotile(i),"jiagang"))return true;
      return false;
    }
    if(seat==undefined){
      let lstaction=getlstaction();
      if(lstaction.name=="RecordNewRound"||lstaction.name=="RecordChangeTile")seat=ju;
      else seat=lstaction.data.seat;
    }
    if(doracnt.lsttype==1){
      doracnt.lsttype=0;
      doracnt.cnt++;
    }
    let tile_states=[];
    let tilecnt=0,jiagangflag=false;
    for(let i=0;i<playertiles[seat].length;i++)if(equaltile(tile,playertiles[seat][i]))tilecnt++;
    if(tilecnt>=1&&(playercnt==3&&tile=="4z"||playercnt==2&&tile=="4z"||playercnt==2&&tile=="3z")&&(type==undefined||type=="babei")){
      if(is_peipaimingpai())tile_states.push(erasemingpai(tile,seat));
      for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
      fulu[seat].push({'type':4,'tile':[tile]});
      drawtype=0;
      addBaBei(calcdoras(),seat,tile,tile_states);
      saveproject();
      return true;
    }
    for(let i=0;i<fulu[seat].length;i++)if(equaltile(fulu[seat][i].tile[0],tile)&&fulu[seat][i].type==1)jiagangflag=true;
    if(tilecnt>=4&&(type==undefined||type=="angang")){
      for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
      doracnt.lsttype=2;
      fulu[seat].push({'type':3,'tile':[]});
      for(let i=0;i<playertiles[seat].length;i++){
        if(equaltile(tile,playertiles[seat][i])){
          if(is_peipaimingpai())tile_states.push(erasemingpai(playertiles[seat][i],seat));
          fulu[seat][fulu[seat].length-1].tile.push(playertiles[seat][i]);
        }
      }
      fulu[seat][fulu[seat].length-1].tile.sort();
      let tmptile=fulu[seat][fulu[seat].length-1].tile[2];
      fulu[seat][fulu[seat].length-1].tile[2]=fulu[seat][fulu[seat].length-1].tile[1];
      fulu[seat][fulu[seat].length-1].tile[1]=fulu[seat][fulu[seat].length-1].tile[0];
      fulu[seat][fulu[seat].length-1].tile[0]=tmptile;
      if(!is_chuanma())drawtype=0;
      else{
        for(let i=0;i<playercnt;i++){
          if(i==seat||hupaied[i])continue;
          chuanmagangs.notover.push({'from':i,'to':seat,'val':2000});
        }
      }
      addAnGangAddGang(calcdoras(),seat,tile,3,tile_states);
      saveproject();
      return true;
    }
    if(jiagangflag&&tilecnt>=1&&(type==undefined||type=="jiagang")){
      for(let i=0;i<playercnt;i++)if(liqiinfo[i].yifa==1)liqiinfo[i].yifa=2;
      doracnt.lsttype=1;
      for(let i=0;i<fulu[seat].length;i++){
        if(fulu[seat][i].type==1&&equaltile(fulu[seat][i].tile[0],tile)){
            fulu[seat][i].type=2;
            for(let j=0;j<playertiles[seat].length;j++){
              if(equaltile(tile,playertiles[seat][j])){
                if(is_peipaimingpai())tile_states.push(erasemingpai(playertiles[seat][i],seat));
                fulu[seat][i].tile.push(playertiles[seat][j]);
              }
            }
            fulu[seat][i].tile.push(tile);
            break;
        }
      }
      if(!is_chuanma())drawtype=0;
      else{
        if(playertiles[seat][playertiles[seat].length-1]==tile){
          for(let i=0;i<playercnt;i++){
            if(i==seat||hupaied[i])continue;
            chuanmagangs.notover.push({'from':i,'to':seat,'val':1000});
          }
        }
      }
      addAnGangAddGang(calcdoras(),seat,tile,2,tile_states);
      saveproject();
      return true;
    }
    return false;
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function notileliuju(){
  try{
    let playerleft=0;
    for(let seat=0;seat<playercnt;seat++)if(!hupaied[seat])playerleft++;
    let tingcnt=0;
    let liujumanguan=false;
    let ret=[];
    for(let i=0;i<playercnt;i++){
      let tings=tingpai(i);
      if(tings.length==0||hupaied[i]){
        ret.push({
          'tingpai':false,
          'hand':[],
          'tings':[]
        });
      }
      else{
        tingcnt++;
        playertiles[i].sort(cmp);
        ret.push({
          'tingpai':true,
          'hand':[].concat(playertiles[i]),
          'tings':tings
        });
      }
    }
    let ret2=[];
    for(let i=ju;i<playercnt+ju;i++){
      if(is_chuanma())break;
      seat=i%playercnt;
      if(!paihe[seat].liujumanguan||hupaied[seat])continue;
      liujumanguan=true;
      let score=0;
      playertiles[seat].sort(cmp);
      for(let i=0;i<playercnt;i++){
        if(seat==i||hupaied[i])continue;
        if(seat==ju||i==ju){
          delta_scores[i]-=4000;
          delta_scores[seat]+=4000;
          score+=4000;
        }
        else{
          delta_scores[i]-=2000;
          delta_scores[seat]+=2000;
          score+=2000;
        }
      }
      if(playercnt==3&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(seat==i||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=2000;
            delta_scores[seat]+=2000;
            score+=2000;
          }
          else{
            delta_scores[i]-=1000;
            delta_scores[seat]+=1000;
            score+=1000;
          }
        }
      }
      if(playercnt==2&&have_zimosun()==false){
        for(let i=0;i<playercnt;i++){
          if(seat==i||hupaied[i])continue;
          if(seat==ju){
            delta_scores[i]-=8000;
            delta_scores[seat]+=8000;
            score+=8000;
          }
          else{
            delta_scores[i]-=4000;
            delta_scores[seat]+=4000;
            score+=4000;
          }
        }
      }
      let ming=[];
      for(let i=0;i<fulu[seat].length;i++){
        let tiles=fulu[seat][i].tile;
        if(fulu[seat][i].type==0)ming.push("shunzi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
        else if(fulu[seat][i].type==1)ming.push("kezi("+tiles[0]+","+tiles[1]+","+tiles[2]+")");
        else if(fulu[seat][i].type==2)ming.push("minggang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
        else if(fulu[seat][i].type==3)ming.push("angang("+tiles[0]+","+tiles[1]+","+tiles[2]+","+tiles[3]+")");
      }
      ret2.push({
        'delta_scores':[].concat(delta_scores),
        'doras':calcdoras(),
        'hand':[].concat(playertiles[seat]),
        'ming':ming,
        'old_scores':[].concat(scores),
        'score':score,
        'seat':seat
      });
      for(let i=0;i<playercnt;i++){
        scores[i]=scores[i]+delta_scores[i];
        delta_scores[i]=0;
      }
    }
    if(liujumanguan&&!is_chuanma()){
      endNoTile(true,ret,ret2);
      if(!is_xuezhandaodi()&&!is_xueliu())ben++;
      if(ret[ju].tingpai==false||is_xuezhandaodi())ju++;
      roundend();
      saveproject();
      return;
    }
    ret2=[{'delta_scores':[],'old_scores':[]}];
    if(tingcnt!=0&&tingcnt!=playerleft){
      if(!is_chuanma()){
        for(let seat=0;seat<playercnt;seat++){
          if(hupaied[seat])continue;
          if(ret[seat].tingpai==true)delta_scores[seat]+=(playerleft-1)*1000/tingcnt;
          else delta_scores[seat]-=(playerleft-1)*1000/(playerleft-tingcnt);
        }
      }
      else{
        for(let seat=0;seat<playercnt;seat++){
          for(let i=0;i<playercnt;i++){
            if(hupaied[seat]||hupaied[i]||i==seat)continue;
            if(huazhu(i)&&ret[seat].tingpai==true){
              delta_scores[seat]+=Math.max(calcsudian_chuanma(calcfan_chuanma(playertiles[seat],seat,false)),8000);
              delta_scores[i]-=Math.max(calcsudian_chuanma(calcfan_chuanma(playertiles[seat],seat,false)),8000);
            }
            else if(huazhu(i)){
              delta_scores[seat]+=8000;
              delta_scores[i]-=8000;
            }
            else if(ret[i].tingpai==false&&ret[seat].tingpai==true){
              delta_scores[seat]+=calcsudian_chuanma(calcfan_chuanma(playertiles[seat],seat,false));
              delta_scores[i]-=calcsudian_chuanma(calcfan_chuanma(playertiles[seat],seat,false));
            }
          }
        }
      }
    }
    ret2[0].old_scores=[].concat(scores);
    ret2[0].delta_scores=[].concat(delta_scores);
    if(is_chuanma()){
      let taxes=[0,0,0,0];
      for(let i=0;i<chuanmagangs.over.length;i++){
        let from=chuanmagangs.over[i].from,to=chuanmagangs.over[i].to,val=chuanmagangs.over[i].val;
        if(ret[to].tingpai==false){
          taxes[to]-=val;
          taxes[from]+=val;
        }
      }
      ret2[0].taxes=taxes;
      for(let seat=0;seat<playercnt;seat++)scores[seat]=scores[seat]+taxes[seat];
    }
    for(let seat=0;seat<playercnt;seat++)scores[seat]=scores[seat]+delta_scores[seat];
    endNoTile(false,ret,ret2);
    if(!is_xuezhandaodi()&&!is_chuanma())ben++;
    if((ret[ju].tingpai==false||is_xuezhandaodi())&&!is_chuanma())ju++;
    roundend();
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function liuju(){
  try{
    let ret;
    for(let seat=0;seat<playercnt;seat++){
      let cnt=[],yaojiutype=0;
      for(let i=0;i<=36;i++)cnt[i]=0;
      for(let i=0;i<playertiles[seat].length;i++)cnt[tiletoint(playertiles[seat][i])]++;
      if(cnt[1]>=1)yaojiutype++;if(cnt[9]>=1)yaojiutype++;
      if(cnt[10]>=1)yaojiutype++;if(cnt[18]>=1)yaojiutype++;
      if(cnt[19]>=1)yaojiutype++;if(cnt[27]>=1)yaojiutype++;
      if(cnt[28]>=1)yaojiutype++;if(cnt[29]>=1)yaojiutype++;
      if(cnt[30]>=1)yaojiutype++;if(cnt[31]>=1)yaojiutype++;
      if(cnt[32]>=1)yaojiutype++;if(cnt[33]>=1)yaojiutype++;
      if(cnt[34]>=1)yaojiutype++;
      if(yaojiutype>=9&&liqiinfo[seat].liqi==0&&liqiinfo[seat].yifa==1&&playertiles[seat].length==14){
        let lsttile=playertiles[seat][playertiles[seat].length-1];
        playertiles[seat].length=playertiles[seat].length-1;
        playertiles[seat].sort(cmp);
        playertiles[seat].push(lsttile);
        if(ret==undefined)ret={
          'name':"RecordLiuJu",
          'data':{
            'seat':seat,
            'tiles':[].concat(playertiles[seat]),
            'type':1
          }
        };
      }
    }
    if(playercnt==4&&paihe[0].tiles.length==1&&paihe[1].tiles.length==1&&paihe[2].tiles.length==1&&paihe[3].tiles.length==1&&paihe[0].tiles[0]==paihe[1].tiles[0]&&paihe[1].tiles[0]==paihe[2].tiles[0]&&paihe[2].tiles[0]==paihe[3].tiles[0]&&tiletoint(paihe[0].tiles[0])>=28&&tiletoint(paihe[0].tiles[0])<=31){
      if(ret==undefined)ret={
        'name':"RecordLiuJu",
        'data':{
          'type':2
        }
      };
    }
    let havegang=[0,0,0,0],havegangcnt=0;
    for(let seat=0;seat<playercnt;seat++){
      for(let i=0;i<fulu[seat].length;i++)if(fulu[seat][i].type==2||fulu[seat][i].type==3)havegang[seat]=1;
      havegangcnt+=havegang[seat];
    }
    if(doracnt.cnt==5&&havegangcnt>=2){
      if(ret==undefined)ret={
        'name':"RecordLiuJu",
        'data':{
          'type':3
        }
      };
    }
    if(playercnt==4&&ret==undefined){
      let liqiplayercnt=0;
      if(liqiinfo[0].liqi!=0)liqiplayercnt++;
      if(liqiinfo[1].liqi!=0)liqiplayercnt++;
      if(liqiinfo[2].liqi!=0)liqiplayercnt++;
      if(liqiinfo[3].liqi!=0)liqiplayercnt++;
      if(liqiplayercnt==3&&lstliqi!=0&&scores[lstliqi.seat]>=1000){
        liqibang=liqibang+1;
        scores[lstliqi.seat]=scores[lstliqi.seat]-1000;
        liqiinfo[lstliqi.seat]={'liqi':lstliqi.type,'yifa':1,'kai':lstliqi.kai};
        let allplayertiles=["","","",""];
        for(let seat=0;seat<playercnt;seat++){
          playertiles[seat].sort(cmp);
          for(let i=0;i<playertiles[seat].length;i++){
            allplayertiles[seat]+=playertiles[seat][i];
            if(i!=playertiles[seat].length-1)allplayertiles[seat]+="|";
          }
        }
        if(ret==undefined)ret={
          'name':"RecordLiuJu",
          'data':{
            'type':4,
            'liqi':{
              'liqibang':liqibang,
              'score':scores[lstliqi.seat],
              'seat':lstliqi.seat
            },
            'allplayertiles':allplayertiles
          }
        };
      } 
    }
    if(hules_history.length!=0)ret.data.hules_history=hules_history;
    actions.push(ret);
    edit_online();
    if(!is_xuezhandaodi()&&!is_chuanma())ben++;
    roundend();
    saveproject();
  }catch(e){
    throw(e);
    loadproject(lstscene);
  }
}
function roundend(type){
  if(actions.length==0)return;
  if(type==undefined&&is_chuanma()&&chuanmagangs.notover.length!=0&&getlstaction().name!="RecordNoTile"&&getlstaction().name!="RecordHuleXueZhanEnd")calcgangpoint(true);
  discardtiles=["","","",""];
  tiles0=null;tiles1=null;tiles2=null;tiles3=null;paishan=null;
  muyuseats="";
  editdata.actions.push([].concat(actions));
  editdata.xun.push([].concat(xun));
  xun=[[],[],[],[]];
  actions=[];
}
function gameend(noedit){
  function cmp2(x,y){
    if(y.part_point_1>x.part_point_1)return 1;
    if(y.part_point_1<x.part_point_1)return -1;
    if(y.seat<x.seat)return 1;
    if(y.seat>x.seat)return -1;
  }
  players=[];
  for(let i=0;i<playercnt;i++)players.push({
    'gold':0,
    'grading_score':0,
    'part_point_1':scores[i],
    'part_point_2':0,
    'seat':i,
    'total_point':0,
  });
  players.sort(cmp2);
  players[0].part_point_1+=liqibang*1000;
  let madian=[[15,5,-5,-15],[10,0,-10],[5,-5]];
  if(playercnt==2){
    players[1].total_point=players[1].part_point_1-firstneededscores+madian[2][1]*1000;
    players[0].total_point=-players[1].total_point;
  }
  else if(playercnt==3){
    for(let i=1;i<3;i++)players[i].total_point=players[i].part_point_1-firstneededscores+madian[1][i]*1000;
    players[0].total_point=-players[1].total_point-players[2].total_point;
  }
  else{
    for(let i=1;i<4;i++)players[i].total_point=players[i].part_point_1-firstneededscores+madian[0][i]*1000;
    players[0].total_point=-players[1].total_point-players[2].total_point-players[3].total_point;
  }
  editdata.players=players;
  if(noedit!=true)edit();
}
function randompaishan(paishan,paishanback,reddora){
  if(editdata.actions.length==0)gamebegin();
  try{
    if(unsafeWindow.tiles0!=null){tiles0=unsafeWindow.tiles0;unsafeWindow.tiles0=null;}
    if(unsafeWindow.tiles1!=null){tiles1=unsafeWindow.tiles1;unsafeWindow.tiles1=null;}
    if(unsafeWindow.tiles2!=null){tiles2=unsafeWindow.tiles2;unsafeWindow.tiles2=null;}
    if(unsafeWindow.tiles3!=null){tiles3=unsafeWindow.tiles3;unsafeWindow.tiles3=null;}
  }catch(e){};
  if(tiles0==null)tiles0=[];if(tiles1==null)tiles1=[];
  if(tiles2==null)tiles2=[];if(tiles3==null)tiles3=[];
  if(typeof(tiles0)=="string")tiles0=separatetile(tiles0);
  if(typeof(tiles1)=="string")tiles1=separatetile(tiles1);
  if(typeof(tiles2)=="string")tiles2=separatetile(tiles2);
  if(typeof(tiles3)=="string")tiles3=separatetile(tiles3);
  if(typeof(paishanback)=="number"){reddora=paishanback;paishanback=undefined;}
  paishan=decompose(paishan);
  if(paishanback!=undefined)paishanback=decompose(paishanback);
  if(reddora==undefined){
    if(config.mode.mode>=21){
      if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora_count!=undefined)reddora=config.mode.detail_rule.dora_count;
      else reddora=1;
    }
    else if(config.mode.mode>=11&&config.mode.mode<=20){
      if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora_count!=undefined)reddora=config.mode.detail_rule.dora_count;
      else reddora=2;
    }
    else{
      if(config&&config.mode&&config.mode.detail_rule&&config.mode.detail_rule.dora_count!=undefined)reddora=config.mode.detail_rule.dora_count;
      else reddora=3;
    }
  }
  function randomcmp(x,y){
    return Math.random()-0.5;
  }
  let cnt=[],tls=[];
  for(let i=1;i<=34;i++)cnt[i]=4;
  if((tiles2==null||tiles2.length==0)&&(tiles3==null||tiles3.length==0)){
    cnt[2]=0;cnt[3]=0;cnt[4]=0;cnt[5]=0;cnt[6]=0;cnt[7]=0;cnt[8]=0;
    cnt[11]=0;cnt[12]=0;cnt[13]=0;cnt[14]=0;cnt[15]=0;cnt[16]=0;cnt[17]=0;
    if(reddora==undefined||reddora==1){cnt[23]=3;cnt[37]=1;}
  }
  else if(tiles3.length==0||tiles3==null){
    cnt[2]=0;cnt[3]=0;cnt[4]=0;cnt[5]=0;cnt[6]=0;cnt[7]=0;cnt[8]=0;
    if(reddora==undefined||reddora==2){cnt[14]=3;cnt[23]=3;cnt[36]=1;cnt[37]=1;}
  }
  else{
    if(reddora==undefined||reddora==3){cnt[5]=3;cnt[14]=3;cnt[23]=3;cnt[35]=1;cnt[36]=1;cnt[37]=1;}
    if(reddora==4){cnt[5]=3;cnt[14]=2;cnt[23]=3;cnt[35]=1;cnt[36]=2;cnt[37]=1;}
  }
  if(is_chuanma()){cnt[28]=0;cnt[29]=0;cnt[30]=0;cnt[31]=0;cnt[32]=0;cnt[33]=0;cnt[34]=0;cnt[35]=0;cnt[36]=0;cnt[37]=0;cnt[5]=4;cnt[14]=4;cnt[23]=4;}
  for(let i=0;i<tiles0.length;i++)cnt[tiletoint(tiles0[i],1)]--;
  for(let i=0;i<tiles1.length;i++)cnt[tiletoint(tiles1[i],1)]--;
  for(let i=0;i<tiles2.length;i++)cnt[tiletoint(tiles2[i],1)]--;
  for(let i=0;i<tiles3.length;i++)cnt[tiletoint(tiles3[i],1)]--;
  for(let i=0;i<paishan.length;i+=2)cnt[tiletoint(paishan[i]+paishan[i+1],1)]--;
  if(paishanback!=undefined)for(let i=0;i<paishanback.length;i+=2)cnt[tiletoint(paishanback[i]+paishanback[i+1],1)]--;
  for(let i=1;i<=37;i++){
    for(let j=1;j<=cnt[i];j++)tls.push(inttotile(i));
  }
  tls.sort(randomcmp);
  for(let i=0;i<tls.length;i++)paishan+=tls[i];
  if(paishanback!=undefined)paishan+=paishanback;
  return paishan;
}
function loadreplay(){
  loadproject();
  let rounds=uiscript.UI_Replay.Inst.rounds;
  editdata.config=view.DesktopMgr.Inst.game_config;
  if(uiscript.UI_Replay.Inst.gameResult.accounts[0])editdata.player_datas[0]=view.DesktopMgr.Inst.player_datas[0];
  if(uiscript.UI_Replay.Inst.gameResult.accounts[1])editdata.player_datas[1]=view.DesktopMgr.Inst.player_datas[1];
  if(uiscript.UI_Replay.Inst.gameResult.accounts[2])editdata.player_datas[2]=view.DesktopMgr.Inst.player_datas[2];
  if(uiscript.UI_Replay.Inst.gameResult.accounts[3])editdata.player_datas[3]=view.DesktopMgr.Inst.player_datas[3];
  editdata.player_datas[0].views=[];editdata.player_datas[1].views=[];
  editdata.player_datas[2].views=[];editdata.player_datas[3].views=[];
  gamebegin();
  for(let i=0;i<rounds.length;i++){
    let tt=rounds[i].actions;
    tiles0=rounds[i].actions[0].data.tiles0;
    tiles1=rounds[i].actions[0].data.tiles1;
    tiles2=rounds[i].actions[0].data.tiles2;
    if(rounds[i].actions[0].data.tiles3)tiles3=rounds[i].actions[0].data.tiles3;
    paishan=rounds[i].actions[0].data.paishan;
    roundbegin();
    for(let j=1;j<tt.length;j++){
      if(tt[j].name=="RecordDealTile")mopai();
      if(tt[j].name=="RecordDiscardTile")qiepai(tt[j].data.tile,tt[j].data.is_liqi);
      if(tt[j].name=="RecordChiPengGang"){
        let tmp=[];
        for(let k=0;k<tt[j].data.tiles.length;k++)if(tt[j].data.froms[k]==tt[j].data.seat)tmp.push(tt[j].data.tiles[k]);
        mingpai(tmp);
      }
      if(tt[j].name=="RecordAnGangAddGang"){
        if(tt[j].data.type==3)leimingpai(tt[j].data.tiles,"angang");
        else leimingpai(tt[j].data.tiles,"jiagang");
      }
      if(tt[j].name=="RecordBaBei")leimingpai("4z","babei");
      if(tt[j].name=="RecordLiuJu")liuju();
      if(tt[j].name=="RecordNoTile")notileliuju();
      if(tt[j].name=="RecordHule"||tt[j].name=="RecordHuleXueZhanMid"||tt[j].name=="RecordHuleXueZhanEnd"){
        let tmp=[];
        for(let k=0;k<tt[j].data.hules.length;k++)tmp.push(tt[j].data.hules[k].seat);
        if(tt[j].name=="RecordHuleXueZhanEnd")hupai(tmp,true);
        else hupai(tmp);
      }
      if(tt[j].name=="RecordChangeTile"){
        huansanzhang(tt[j].data.change_tile_infos[0].out_tiles,tt[j].data.change_tile_infos[1].out_tiles,tt[j].data.change_tile_infos[2].out_tiles,tt[j].data.change_tile_infos[3].out_tiles,tt[j].data.change_type);
      }
      if(tt[j].name=="RecordSelectGap"){
        let tmp="";
        for(let k=0;k<tt[j].data.gap_types.length;k++){
          if(tt[j].data.gap_types[k]==0)tmp+="p";
          if(tt[j].data.gap_types[k]==1)tmp+="m";
          if(tt[j].data.gap_types[k]==2)tmp+="s";
        }
        dingque(tmp);
      }
    }
    roundend();
  }
  gameend();
}
try{unsafeWindow.MRE=new Majsoul_Replay_Editor;}catch(e){}
