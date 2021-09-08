var licaiMessageBox;

(function(window, undefined) {
// 0、获取项目名称 准备工作
function getSearchParam(partUrl, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = partUrl.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

function getCurrentScriptUrl(dataAttrKey, dataAttrVal) {
  var scripts = document.getElementsByTagName('script'),
    scriptsNum = scripts.length,
    // re = /howdy\.js$/,
    curDataAttrVal;
  var curScriptSrc='';

  while (scriptsNum--) {
    curDataAttrVal = scripts[scriptsNum].getAttribute(dataAttrKey);
    if (curDataAttrVal && curDataAttrVal === dataAttrVal) {
      curScriptSrc = scripts[scriptsNum].getAttribute('src');
      break;
    }
  }
  return curScriptSrc

}

function getCurScriptUrlSearchParam(key) {
  var curScriptUrl = getCurrentScriptUrl('data-attr', 'monitor-file-api-error');
  var curScriptUrlSearchParamsString = curScriptUrl.split('?') ? curScriptUrl.split('?')[1] : '';
  if (curScriptUrl) {
    if (curScriptUrlSearchParamsString) {
      return getSearchParam(curScriptUrlSearchParamsString, key)
    }
  }

  return ''

}

var projectName=getCurScriptUrlSearchParam('name');
var nodeIdName=getCurScriptUrlSearchParam('allWrapId');
var notMonitorDiffSiteResource=getCurScriptUrlSearchParam('notMonitorDiffSiteResource');
var notMonitorResource=getCurScriptUrlSearchParam('notMonitorResource');
var errNoNotAlert=getCurScriptUrlSearchParam('errNoNotAlert');
var notMonitorApi=getCurScriptUrlSearchParam('notMonitorApi');
if(!nodeIdName){
  nodeIdName='app'
}



// 一、监控资源加载异常情况
function getSrcOrHref(msg) {
  if (msg.target){
    var res=msg.target.src ||  msg.target.href || (msg.srcElement ? (msg.srcElement.href? msg.srcElement.href:msg.srcElement.src) :'');
    if (res){
      return  res
    }else {
      return ''
    }

  }else {
    return ''
  }
}

function getBrowserInfo() {
  var ua = navigator.userAgent.toLowerCase();
  var micromessenger = new RegExp('micromessenger');
  return micromessenger.test(ua);
}

function getHost(url) {
  // 待优化 ip+端口形式的正则 todo
  var getHostReg=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  // var hostReg=/^\.\w+/g
  return  getHostReg.exec(url)? getHostReg.exec(url)[0] :'';

}

var hasAlert=false;
var isMonitorResource=true;

function addTimeInUrl() {
  if(window.location.href.indexOf('?') !==-1){
    // 有查询字符串情况
    window.location.href = window.location.origin+ window.location.pathname+window.location.search+'&getTimeForReload='+new Date().getTime()+window.location.hash;
  }else {
    // 无查询字符串情况
    window.location.href = window.location.href+'?getTimeForReload='+new Date().getTime();
  }
}
function reprotAndRefresh(reprotTime,refreshTime,targetSrc,isReloadMethod) {
  var time=new Date().getTime();
  if(isReloadMethod){
    window.location.reload(true);
  }else {
    addTimeInUrl()
  }

  setTimeout(function () {
    if(document && document.body){
      var _frm0 = document? document.createElement("iframe"):'';
      if(_frm0 && document && document.body){
        _frm0.style.display = "none";
        // _frm.src = 'https://h5.4417.com/ios/test.html?otherinfo=iframe';
        _frm0.src='https://h5.4417.com/ios/test.html?otherinfo=reloadFail7S'+new Date().getTime()+window.encodeURIComponent(targetSrc)+'&from='+window.encodeURIComponent(window.location.href)+'&project='+projectName+'&timeLC='+time;
        document.body.appendChild(_frm0);
      }

    }
  },reprotTime*1000)


  // setTimeout(function () {
  //   if(!hasAlert){
  //     if(licaiMessageBox){
  //       licaiMessageBox.tips('检测到您的网速过慢或资源加载失败，即将帮您自动刷新浏览器，如果刷新失败建议您手动刷新浏览器或切换网络后刷新浏览器')
  //     }
  //     alert('检测到您的网速过慢或资源加载失败，即将帮您自动刷新浏览器，如果刷新失败建议您手动刷新浏览器或切换网络后刷新浏览器');
  //
  //     hasAlert=true;
  //   }
  //   // window.location.reload(true);
  //   if(isReloadMethod){
  //     window.location.href = window.location.href+'?getTimeForReload='+new Date().getTime();
  //   }else {
  //     window.location.reload(true);
  //   }
  //
  // },refreshTime*1000)

}

window.addEventListener('error', function(msg, url, row, col, error){
  // console.log(msg)
  var targetSrc = getSrcOrHref(msg);
  var isSameSite=getHost(targetSrc)===window.location.hostname;



  if(notMonitorDiffSiteResource){
    isSameSite=false
  }
  if(notMonitorResource){
    isMonitorResource=false
  }



  if (msg.target && !msg.message && targetSrc && isSameSite && isMonitorResource) {
    document.getElementById(nodeIdName)? document.getElementById(nodeIdName).innerText='检测到页面有更新或资源加载失败,请刷新浏览器或切换网络后刷新浏览器。(加载失败的资源地址:'+targetSrc+')':'';
    // alert('检测到页面有更新或资源加载失败，即将刷新浏览器。'+targetSrc);

    if(getBrowserInfo()){
      reprotAndRefresh(10,12,targetSrc,false)
    }else {
      reprotAndRefresh(10,12,targetSrc,true)

    }

  }
  // console.log('msg.target',msg.target)

  console.warn(msg.target ? msg.target.outerHTML:'无法找到目标地址');
  console.warn(msg.srcElement ? msg.srcElement.outerHTML:'无法找到目标地址');
  console.warn(
    msg, url, row, col, error
  );
  return true;
}, true);


// 二、监控接口异常情况
if(!notMonitorApi){
 function resStatusOrErrnoAbnormal(target) {

  switch (Number(target.status)) {
    case 400:
      // alert('参数异常，请刷新重试。'+error.response.data?error.response.data.errmsg:'')
      if(licaiMessageBox){
        licaiMessageBox.tips('400参数异常,请退出重试。'+JSON.parse(target.response).errmsg)
      }
      alert('400参数异常,请退出重试。'+JSON.parse(target.response).errmsg)
      // Notification.error({
      //     title: '错误',
      //     message: `${error.response.status}传递参数出现错误:${error.response.data.errmsg}`,
      //     duration: 5000,
      // });
      break;
    case 401:
      if(licaiMessageBox){
        licaiMessageBox.tips('401验证信息过期，请退出重试'+target.responseURL)
      }
      alert('401验证信息过期，请退出重试'+target.responseURL)
      // alert('401')
      // Notification.error({
      //     title: '错误',
      //     message: '登录信息过期，跳转登陆页401',
      //     duration: 5000,
      // });
      break;

    case 403:
      if(licaiMessageBox){
        licaiMessageBox.tips('403您没有权限进行此操作'+target.responseURL)
      }
      alert('403您没有权限进行此操作'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '您没有权限进行此操作403',
      //     duration: 5000,
      // });
      break;
    case 404:
      if(licaiMessageBox){
        licaiMessageBox.tips('接口未找到'+target.responseURL)
      }
      alert('接口未找到'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: `接口未找到404${error.responseURL}`,
      //     duration: 5000,
      // });
      break;
    case 500:
      if(licaiMessageBox){
        licaiMessageBox.tips('服务器500，请退出重试'+target.responseURL)
      }
      alert('服务器500，请退出重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '后端服务器内部错误500',
      //     duration: 5000,
      // });
      break;
    case 501:
      if(licaiMessageBox){
        licaiMessageBox.tips('服务器501，请退出重试'+target.responseURL)
      }
      alert('服务器501，请退出重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '服务器不具备完成请求的功能(如无法识别请求方法)501',
      //     duration: 5000,
      // });
      break;
    case 502:
      if(licaiMessageBox){
        licaiMessageBox.tips('服务器502，请退出重试'+target.responseURL)
      }
      alert('服务器502，请退出重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '错误网关，收到无效响应502',
      //     duration: 5000,
      // });
      break;
    case 503:
      if(licaiMessageBox){
        licaiMessageBox.tips('服务器503，请稍后重试'+target.responseURL)
      }
      alert('服务器503，请稍后重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '后端服务暂不可用(超载或停机维护)503',
      //     duration: 5000,
      // });
      break;
    case 504:
      if(licaiMessageBox){
        licaiMessageBox.tips('网关超时504，请稍后重试'+target.responseURL)
      }
      alert('网关超时504，请稍后重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: '网关超时504',
      //     duration: 5000,
      // });
      break;
    case 505:
      if(licaiMessageBox){
        licaiMessageBox.tips('HTTP 版本不受支持505，请更换浏览器重试'+target.responseURL)
      }
      alert('HTTP 版本不受支持505，请更换浏览器重试'+target.responseURL)
      // Notification.error({
      //     title: '错误',
      //     message: 'HTTP 版本不受支持505',
      //     duration: 5000,
      // });
      break;
    default:
      // console.log('status:'+target.status+' url:'+target.responseURL+' response:'+target.response)

      // console.log('status:'+target.status+' url:'+target.responseURL)
      if(Number(target.status)===200 || Number(target.status)===301 || Number(target.status)===302 || Number(target.status)===304){
        // console.error('response:'+target.response)
        try {
          if(target.response && Number(JSON.parse(target.response).errno)){
            if(licaiMessageBox){
              licaiMessageBox.tips(JSON.parse(target.response).errmsg)
            }
            if(!errNoNotAlert){
              alert(JSON.parse(target.response).errmsg)
            }

          }

        }catch (err){
          // console.log('忽略--JSON.parse解析失败',err)

        }

      }

      break;
  }


}

 function listenerHTTPErrorAndCallBack(callBackFunc) {
  (function (xhr) {
    // Capture request before any network activity occurs:
    var send = xhr.send;
    xhr.send = function (data) {
      // this.addEventListener('loadstart', onLoadStart);
      // this.addEventListener('loadend', onLoadEnd);
      // this.addEventListener('timeout', function (err) {
      //   console.error(err,xhr)
      //   alert('接口请求超时'+err)
      // });



      // 1、出现网络错误
      this.addEventListener('error', function (err) {
        console.error(err);
        var errUrl=err.target.fundebugTemp?err.target.fundebugTemp.url:'未知网址';
        callBackFunc(errUrl)
        // console.log('licaiMessageBox',licaiMessageBox)
        if(licaiMessageBox){
          licaiMessageBox.tips('接口网络异常，请刷新页面或切换网络重试。'+errUrl)
        }

        alert('接口网络异常，请刷新页面或切换网络重试。'+errUrl)
      });

      // 2、状态码或errmsg异常时
      this.addEventListener('load', function (progressEvent) {
        if(progressEvent && progressEvent.target){
          resStatusOrErrnoAbnormal(progressEvent.target)

        }
      });
      // // 查询真实请求进度
      // this.addEventListener('progress', function (progressEvent) {
      //   if(progressEvent && progressEvent.lengthComputable){
      //     console.log('事件中的progressEvent',progressEvent)
      //     console.log('占比',progressEvent.loaded/progressEvent.total)
      //     // console.log('progressEvent.loaded',progressEvent.loaded)
      //     // console.log('progressEvent.total',progressEvent.total)
      //   }
      // });
      //
      // this.addEventListener('loadend',function (progressEvent) {
      //   if(progressEvent){
      //     console.log('progressEvent.loaded',progressEvent.loaded)
      //   }
      // })

      return send.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype);


}
 function showHTTPError(errUrl) {
   document.getElementById(nodeIdName)?document.getElementById(nodeIdName).innerText='接口异常，请刷新页面或切换网络重试。'+errUrl:''
 }
 listenerHTTPErrorAndCallBack(showHTTPError)
}


// 三、断网、弱网及WiFi和数据流量提示
// 1、断网
// console.log('navigator.connection',navigator.connection)
window.addEventListener('offline', function () {
  alert('检测到您没有连接到网络')
  if(licaiMessageBox){
    licaiMessageBox.tips('检测到您没有连接到网络')
  }
  // alert('检测到您没有连接到网络')
})
window.addEventListener('online', function () {
  // alert('网络恢复正常了')
  // console.log('网络恢复正常了')
  if(licaiMessageBox){
    licaiMessageBox.tips('网络恢复正常了')
  }
})
// 2、网络环境切换及网络较差提示
var connection = navigator.connection;
if(connection){
  var type = connection.effectiveType;
  function updateConnectionStatus() {
    // if(licaiMessageBox){
    //   licaiMessageBox.tips("网络状况从 " + type + " 切换至" + connection.effectiveType,4000,true)
    // }
    // alert("网络状况从 " + type + " 切换至" + connection.effectiveType)
    if(licaiMessageBox){
      licaiMessageBox.tips("网络状况从 " + type + " 切换至" + connection.effectiveType)
    }
    type = connection.effectiveType;
    checkInternetSpeed()

  }
  function checkInternetSpeed(){
    if(connection.downlink && connection.downlink < 0.5){
      // alert('检测到网速较差，建议切换网络')
      setTimeout(function () {
        if(licaiMessageBox){
          licaiMessageBox.tips("检测到网速较差，建议切换网络")
        }
        // alert("检测到网速较差，建议切换网络")
        // console.log("检测到网速较差，建议切换网络")
      },300)

    }

    // 网速提示
    // downlink: 10
    // effectiveType: "4g"
    // onchange: null
    // rtt: 250
    // saveData: false

    // downlink: 1.45
    // effectiveType: "3g"
    // onchange: null
    // rtt: 550
    // saveData: false


    // downlink: 0.4
    // effectiveType: "2g"
    // onchange: null
    // rtt: 2050
    // saveData: false

    // downlink: 0
    // effectiveType: "4g"
    // onchange: null
    // rtt: 0
    // saveData: false

  }
  // 监听网络环境切换
  connection.addEventListener('change', updateConnectionStatus);
  checkInternetSpeed()



}
})(window);






