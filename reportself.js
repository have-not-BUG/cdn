(function(window, undefined) {
  // 创建 反馈网页问题及message box DOM元素
var reprotProblemLicai200316 = document.createElement('div');
reprotProblemLicai200316.innerHTML = '<div id="reprot-problem-licai200316">\n' +
  '  反<br>馈<br>网<br>页<br>问<br>题<br>\n' +
  '</div>\n' +
  '\n' +
  '<div class="msg-box-ct-lc20200612 hide">\n' +
  '  <div class="msg-title-ct">标题</div>\n' +
  '  <div class="msg-body-ct">\n' +
  '    <div class="msg-body-input-ct">\n' +
  '      <input type="text" title="prompt" class="msg-body-input" placeholder="点击此处输入文字">\n' +
  '    </div>\n' +
  '    <p class="msg-body-title hide">确定执行此操作?</p>\n' +
  '  </div>\n' +
  '  <div class="msg-bottom-ct">\n' +
  '    <div class="alert sure hide">确定</div>\n' +
  '    <div class="prompt-btn-ct">\n' +
  '      <span class="cancel">取消</span>\n' +
  '      <span class="sure">确定</span>\n' +
  '    </div>\n' +
  '    <div class="confirm-btn-ct hide">\n' +
  '      <span class="cancel">取消</span>\n' +
  '      <span class="sure">确定</span>\n' +
  '    </div>\n' +
  '  </div>\n' +
  '</div>\n' +
  '<div class="cover-ct-lc20200612 hide"></div>\n' +
  '<div  class="warn-tip-lc20200612 hide"></div>';
document.body.appendChild(reprotProblemLicai200316);

// function isWechatBrowser() {
//   var ua = navigator.userAgent.toLowerCase();
//   console.log(typeof ua, ua);
//   var patt1 = new RegExp('micromessenger');
//   var m = patt1.test(ua);
//   return m;
// }
//
// var otherBrowser=isWechatBrowser()?'手机自带浏览器':'微信公众号';


var coverCt = document.getElementsByClassName('cover-ct-lc20200612')[0];
var msgBoxCt = document.getElementsByClassName('msg-box-ct-lc20200612')[0];
var reprotProblemBtn = document.getElementById('reprot-problem-licai200316');
var msgTitle = document.querySelector('.msg-box-ct-lc20200612 .msg-title-ct');
var promptSureBtn = document.querySelector('.msg-box-ct-lc20200612 .prompt-btn-ct .sure');
var promptCancelBtn = document.querySelector('.msg-box-ct-lc20200612 .prompt-btn-ct .cancel');
var promptBtnCt = document.querySelector('.msg-box-ct-lc20200612 .prompt-btn-ct');
var confirmSureBtn = document.querySelector('.msg-box-ct-lc20200612 .confirm-btn-ct .sure');
var confirmCancelBtn = document.querySelector('.msg-box-ct-lc20200612 .confirm-btn-ct .cancel');
var confirmBtnCt = document.querySelector('.msg-box-ct-lc20200612 .confirm-btn-ct');
var msgBodyTitle = document.querySelector('.msg-box-ct-lc20200612 .msg-body-title');
var msgBodyInputCt = document.querySelector('.msg-box-ct-lc20200612 .msg-body-input-ct');
var alertBtn = document.querySelector('.msg-box-ct-lc20200612 .msg-bottom-ct .alert');
// var allLocalStorageInURL=putStorageInURL('localStorage','&licaiLS');
// var allSessionStorageInURL=putStorageInURL('sessionStorage','&licaiSS');
var problemOrProjectName='';

var notPassStorageKeysArray = ['QMAPI', '_AMap', 'BMap_'];




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

function getSearchParam(partUrl, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = partUrl.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}


function getCurScriptUrlSearchParam(key) {
  var curScriptUrl = getCurrentScriptUrl('data-attr', 'licai-reportself');
  var curScriptUrlSearchParamsString = curScriptUrl.split('?') ? curScriptUrl.split('?')[1] : '';
  if (curScriptUrl) {
    if (curScriptUrlSearchParamsString) {
      return getSearchParam(curScriptUrlSearchParamsString, key)
    }
  }

  return ''

}

var notStorageKeysInUrlArray = getCurScriptUrlSearchParam('notStorageKeys').split(',');

var projectName=getCurScriptUrlSearchParam('name');
var apiKey=getCurScriptUrlSearchParam('apikey');
var isRight=getCurScriptUrlSearchParam('right');

problemOrProjectName=problemOrProjectName?problemOrProjectName:projectName;

if(notStorageKeysInUrlArray[0]){
  notPassStorageKeysArray=notPassStorageKeysArray.concat(notStorageKeysInUrlArray)

}


// console.log('notPassStorageKeysArray', notPassStorageKeysArray)

// putStorageKeysToArray()


function hasClass(el, cls) {
  var reg = new RegExp('(\\s|^)' + cls + '(\\b|$)', 'g');
  return reg.test(el.className);
}

function addClass(el, cls) {
  var reg = new RegExp('(\\s|^)' + cls + '(\\b|$)', 'g');
  if (!reg.test(el.className)) {
    return el.className += ' ' + cls;
  }
}

function removeClass(el, cls) {
  var reg = new RegExp('(\\s|^)' + cls + '(\\b|$)', 'g');
  if (reg.test(el.className)) {
    return el.className = el.className.replace(reg, '');
  }
}

function openMsgBox(obj) {
  removeClass(coverCt, 'hide')
  removeClass(msgBoxCt, 'hide')
  msgTitle.innerText = obj.title || window.location.hostname


}

function closeMsgBox() {
  if(document.querySelector('.msg-box-ct-lc20200612 .msg-body-input')){
    document.querySelector('.msg-box-ct-lc20200612 .msg-body-input').value = '';
  }

  msgTitle.innerText = '标题'
  addClass(coverCt, 'hide')
  addClass(msgBoxCt, 'hide')
}

function switchElementHideOrShow(type) {
  var elementHideOrShow = {
    'alertType': function () {
      removeClass(msgBodyTitle, 'hide')
      addClass(confirmBtnCt, 'hide')
      removeClass(alertBtn, 'hide')
      addClass(msgBodyInputCt, 'hide')
      addClass(promptBtnCt, 'hide')
    },
    'confirmType': function () {
      removeClass(msgBodyTitle, 'hide')
      removeClass(confirmBtnCt, 'hide')
      addClass(alertBtn, 'hide')
      addClass(msgBodyInputCt, 'hide')
      addClass(promptBtnCt, 'hide')
    },
    'promptType': function () {
      addClass(msgBodyTitle, 'hide')
      addClass(confirmBtnCt, 'hide')
      addClass(alertBtn, 'hide')
      removeClass(msgBodyInputCt, 'hide')
      removeClass(promptBtnCt, 'hide')
    }

  };
  return elementHideOrShow[type]()

}

var alertObjSureCallbackFn=null;
var confirmObjSureCallbackFn=null;
var confirmObjCancelCallbackFn=null;
var promptObjSureCallbackFn=null;
var promptObjCancelCallbackFn=null;



function onceEvent(selector,type,confirmObj) {
  var isSureType=hasClass(selector,'sure') || hasClass(selector,'alert');
  // 装饰器模式
  var _sureCallbackFn=function () {
    confirmObj.sureCallbackFn();
    closeMsgBox()
  }
  var _cancelCallbackFn=function () {
    confirmObj.cancelCallbackFn();
    closeMsgBox()
  }

  if(isSureType){
    selector.removeEventListener(type,_sureCallbackFn)
    selector.addEventListener(type,_sureCallbackFn,false)
    return _sureCallbackFn
  }else {
    selector.removeEventListener(type,_cancelCallbackFn)
    selector.addEventListener(type,_cancelCallbackFn,false)
    return _cancelCallbackFn
  }

}

var licaiMessageBox={
  alert:function(alertObjOrStr){
    // obj={
    //   title:'标题',
    //   text:'您没有权限!',
    //   sureCallbackFn:alertCallback
    // };
    // 既可以传obj也可以传string
    if(typeof alertObjOrStr ==='string'){
      var alertStr=alertObjOrStr;
      alertObjOrStr={
        text:alertStr,
        sureCallbackFn:function () {
          console.log('alert执行了(传递的是string)')
        }
      }
    }
    openMsgBox(alertObjOrStr)

    switchElementHideOrShow('alertType');
    if (alertObjOrStr.text) {
      document.querySelector('.msg-box-ct-lc20200612 .msg-body-title').innerText = alertObjOrStr.text
    }
    if(alertObjSureCallbackFn){
      alertBtn.removeEventListener('click',alertObjSureCallbackFn)

    }

    alertObjSureCallbackFn=onceEvent(alertBtn,'click',alertObjOrStr)

    // alertBtn.removeEventListener('click', alertObj.sureCallbackFn, false);
    // alertBtn.addEventListener('click', alertObj.sureCallbackFn, false);


  },
  confirm:function (confirmObj) {
    // confirmObj={
    //   title: '请注意！',
    //   text: "即将跳转至【网页问题反馈页面】，请注意保存当前页面信息。",
    //   sureCallbackFn: goToReportWebsiteTakeProblem,
    //   cancelCallbackFn: notGotoReportWebsite
    // }
    openMsgBox(confirmObj)
    switchElementHideOrShow('confirmType');
    // addClass(msgBodyInputCt,'hide')
    // addClass(promptBtnCt,'hide')
    // removeClass(confirmBtnCt,'hide')
    // removeClass(msgBodyTitle,'hide')

    if (confirmObj.text) {
      document.querySelector('.msg-box-ct-lc20200612 .msg-body-title').innerText = confirmObj.text
    }
    if(confirmObjSureCallbackFn){
      confirmSureBtn.removeEventListener('click',confirmObjSureCallbackFn)

    }
    if(confirmObjCancelCallbackFn){
      confirmCancelBtn.removeEventListener('click',confirmObjCancelCallbackFn)

    }
    confirmObjSureCallbackFn=onceEvent(confirmSureBtn,'click',confirmObj)
    confirmObjCancelCallbackFn=onceEvent(confirmCancelBtn,'click',confirmObj)




  },
  prompt:function (promptObj) {
    //   // promptObj={
//   //   title:'请输入问题',
//   //   text:'默认值',
//   //   sureCallbackFn:promptSureCallback,
//   //   cancelCallbackFn:promptCancelCallback,
//   // }
    openMsgBox(promptObj);
    // 展示input 隐藏中间一行字
    switchElementHideOrShow('promptType');
    // addClass(msgBodyTitle,'hide')
    // addClass(confirmBtnCt,'hide')
    // removeClass(promptBtnCt,'hide')
    // removeClass(msgBodyInputCt,'hide')


    if (promptObj.text) {
      document.querySelector('.msg-box-ct-lc20200612 .msg-body-input').value = promptObj.text
    }
    if(promptObjSureCallbackFn){
      promptSureBtn.removeEventListener('click',promptObjSureCallbackFn)

    }
    if(promptObjCancelCallbackFn){
      promptCancelBtn.removeEventListener('click',promptObjCancelCallbackFn)

    }
    promptObjSureCallbackFn=onceEvent(promptSureBtn,'click',promptObj)
    promptObjCancelCallbackFn=onceEvent(promptCancelBtn,'click',promptObj)


  },
  tips:function (optObjOrStr) {
    // optObjOrStr={
    //   message:'tips信息',
    //   time:2000, // 毫秒,
    //   isHide:false // 是否隐藏 默认否 可不填
    // }
    // 既可以传obj也可以传string
    if(typeof optObjOrStr ==='string'){
      var tipsStr=optObjOrStr;
      optObjOrStr={
        message:tipsStr,
      }
    }

    var warnTipElement = document.getElementsByClassName('warn-tip-lc20200612')[0];
    var time=optObjOrStr.time || 3000
    if (warnTipElement) {
      if (optObjOrStr.isHide) {
        addClass(warnTipElement, 'hide')
        // warnTipElement.style.display = 'block';
      } else {
        // warnTipElement.style.display = 'none';
        warnTipElement.innerHTML = '<p>' + optObjOrStr.message + '</p>';
        removeClass(warnTipElement, 'hide')

      }
      setTimeout(function () {
        // warnTipElement.style.display = 'none'
        addClass(warnTipElement, 'hide')
      }, time)
    }


  }



}
// licaiMessageBox.confirm({
//   title: '测试',
//   text: "提示信息",
//   sureCallbackFn:showSure,
//   cancelCallbackFn:showCancel
//
//
// })
  // 对外全局暴露 licaiMessageBox 对象
  window.licaiMessageBox=licaiMessageBox


function getReportWebsiteUrl(isIframe, problemOrProjectName) {
  var allLocalStorageInURL = putStorageInURL('localStorage', '&licaiLS');
  var allSessionStorageInURL = putStorageInURL('sessionStorage', '&licaiSS');
  // return  'http://172.17.87.161:3000/test.html?otherinfo=reprotProblem&from='+window.encodeURIComponent(window.location.href)+'&project='+isIframe+window.location.host+problemOrProjectName+'&allLocalStorage='+window.encodeURIComponent(allLocalStorageInURL);
  return 'https://h5.4417.com/ios/test.html?otherinfo=reprotProblem&from=' + window.encodeURIComponent(window.location.href) + '&project=' + isIframe + window.location.host + problemOrProjectName + '&allLocalStorage=' + window.encodeURIComponent(allLocalStorageInURL) + '&allSessionStorage=' + window.encodeURIComponent(allSessionStorageInURL)+'&apikey='+window.encodeURIComponent(apiKey);
}


function putStorageInURL(storageType, searchWord) {
  var allStorageInURL = '';
  if (window[storageType]){
    for (var i = 0; i < Object.keys(window[storageType]).length; i++) {
      if (!hasMatchNotPassStorageKeysArr(window[storageType].key(i))) {
        allStorageInURL = allStorageInURL + searchWord + window[storageType].key(i) + '=' + window[storageType].getItem(window[storageType].key(i))
      }
      // console.log('window.localStorage里存储的第'+i+'条数据的名字为：'+window.localStorage.key(i)+',值为：'+window.localStorage.getItem(window.localStorage.key(i)));
    }

  }
  return allStorageInURL
}

function hasMatchNotPassStorageKeysArr(str) {
  if(!str){
    return true
  }
  return notPassStorageKeysArray.some(function (item) {
    return str.indexOf(item) !== -1
  })

}



function goToReportWebsiteTakeProblem() {

  // 新建窗口打开
  // var a = document.createElement("a");
  // a.setAttribute("href", getReportWebsiteUrl('NotIframe', problemOrProjectName));
  // a.setAttribute("target", "_blank");
  // // a.setAttribute("id", "camnpr");
  // document.body.appendChild(a);
  // a.click();

  // 直接跳转
  window.location.href = getReportWebsiteUrl('NotIframe', problemOrProjectName);

  problemOrProjectName = '';
  console.log('confirm 点击了确定')
  // closeMsgBox();

}

function reportProblemByIframe() {
  if (document && document.body) {
    var _frm0 = document ? document.createElement("iframe") : '';
    if (_frm0 && document && document.body) {
      _frm0.style.display = "none";
      // _frm.src = 'https://h5.4417.com/ios/test.html?otherinfo=iframe';
      // _frm0.src='https://h5.4417.com/ios/test.html?otherinfo=reprotProblemByIframe&from='+window.encodeURIComponent(window.location.href)+'&project=ByIframe '+window.location.href+problemOrProjectName;
      _frm0.src = getReportWebsiteUrl('isIframe', problemOrProjectName)
      document.body.appendChild(_frm0);
      // warningTip('反馈成功！', 3, true)
      licaiMessageBox.tips({
        message:'反馈成功！',
      })
    } else {
      // warningTip('反馈失败2，请稍后反馈或联系客服', 5, true)
      licaiMessageBox.tips({
        message:'反馈失败2，请稍后反馈或联系客服',
        time:5000, // 毫秒,
      })
    }

  } else {
    // warningTip('反馈失败1，请稍后反馈或联系客服', 5, true)
    licaiMessageBox.tips({
      message:'反馈失败1，请稍后反馈或联系客服',
      time:5000, // 毫秒,
    })
  }
  problemOrProjectName = ''
  console.log('confirm 点击了取消')
  // closeMsgBox();

}

function notGotoReportWebsite() {
  console.log('confirm 点击了取消')
  // warningTip('已取消反馈问题', 3000, true)
  licaiMessageBox.tips({
    message:'已取消反馈问题',
  })
  // closeMsgBox();
}



function reportProblemPromptSureCallback() {
  problemOrProjectName = document.querySelector('.msg-box-ct-lc20200612 .msg-body-input').value;
  console.log('在prompt点击了确定:' + problemOrProjectName)
  if (!problemOrProjectName) {
    // warningTip('您没有输入文字', 2, true)
    licaiMessageBox.tips({
      message:'您没有输入文字',
    })
    return
  }
  // console.log('e',e)
  closeMsgBox();

  licaiMessageBox.confirm({
    title: '提示',
    text: "是否需要进一步详细反馈问题?(点击'确定'后您可截图/录屏反馈问题)",
    sureCallbackFn: goToReportWebsiteTakeProblem,
    cancelCallbackFn: reportProblemByIframe
  })
}

function reportProblempromptCancelCallback() {

  console.log('在prompt点击了取消')
  closeMsgBox()

}






// 点击“反馈网页问题”按钮
  reprotProblemBtn.addEventListener('click', function () {
    // showAlertAndDoSome({
    //     title:'标题',
    //     text:'您没有权限!',
    //     callbackFn:alertCallback
    // })

    // showPromptAndDoSome({
    //   title:'请务必【详细】填写出问题之前您的操作过程及出现问题时的表现或提示',
    //   text:'',
    //   sureCallbackFn:promptSureCallback,
    //   cancelCallbackFn:promptCancelCallback
    // });
    licaiMessageBox.confirm({
      title: '请注意！',
      text: "即将跳转至【网页问题反馈页面】，请注意保存当前页面信息。",
      sureCallbackFn: goToReportWebsiteTakeProblem,
      cancelCallbackFn: notGotoReportWebsite
      // sureCallbackFn: confirmCallbackFn(confirmSureBtn,goToReportWebsiteTakeProblem),
      // cancelCallbackFn: confirmCallbackFn(confirmCancelBtn,notGotoReportWebsite)
    })
  });

// 判断左右位置
if(isRight){
  addClass(reprotProblemBtn,'right')

}else {
  addClass(reprotProblemBtn,'left')
}
// todo 1、tips可以叠加
})(window);

