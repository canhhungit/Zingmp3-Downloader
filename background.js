(function(){let e;const t="https://zingmp3.vn";function o(){e&&chrome.windows.get(e,(function(){chrome.runtime.lastError||(chrome.windows.remove(e),e=null)}))}chrome.runtime.onMessage.addListener((function(n,r,i){switch(n.message){case"get_cookies":return chrome.cookies.getAll({url:n.url},(function(e){i({cookies:e})})),!0;case"set_cookies":chrome.cookies.set({url:n.url,name:n.name,value:n.value,secure:!0,path:"/",httpOnly:!1});break;case"open_popup":o(),chrome.windows.create({url:"popup.html",type:"popup",left:Math.round((n.width-500)/2),top:Math.round((n.height-500)/2),width:500,height:500},(function(t){e=t.id})),chrome.windows.getCurrent((function(e){chrome.windows.update(e.id,{focused:!0})})),setTimeout((()=>{chrome.runtime.sendMessage({data:n.data,title:n.title,vip:n.vip,login:n.login,key:n.key})}),1e3);break;case"new_tab":chrome.tabs.create({url:n.url,active:!1},(function(e){const o=e.id;setTimeout((()=>{chrome.tabs.remove(o),chrome.cookies.set({url:t,name:n.name,value:"true",secure:!0,path:"/",httpOnly:!1},(function(e){}))}),2e3)}));break}})),chrome.webNavigation.onHistoryStateUpdated.addListener((function(e){0===e.frameId&&e.url.startsWith(t)&&chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{url:e.url})})),o()}))})();