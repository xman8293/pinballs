require=function o(r,c,s){function l(t,e){if(!c[t]){if(!r[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(g)return g(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=c[t]={exports:{}};r[t][0].call(i.exports,function(e){return l(r[t][1][e]||e)},i,i.exports,o,r,c,s)}return c[t].exports}for(var g="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}({GameOverRank:[function(e,t,a){"use strict";cc._RF.push(t,"d97bdIn/jtJmpn7qz0kKhI5","GameOverRank"),cc.Class({extends:cc.Component,name:"GameOverRank",properties:{backSprite:cc.Node,rankLabel:cc.Label,avatarImgSprite:cc.Sprite,nickLabel:cc.Label,topScoreLabel:cc.Label},start:function(){},init:function(e,t,a){var n=t.avatarUrl,i=t.nickname,o=0!=t.KVDataList.length?t.KVDataList[0].value:0;e%2==0&&(this.backSprite.color=new cc.Color(55,55,55,255)),a&&(this.rankLabel.node.color=new cc.Color(0,255,0,255)),this.rankLabel.string=(e+1).toString(),this.createImage(n),this.nickLabel.string=i,this.topScoreLabel.string=o.toString()},createImage:function(e){var t=this;try{var a=wx.createImage();a.onload=function(){try{var e=new cc.Texture2D;e.initWithElement(a),e.handleLoadedTexture(),t.avatarImgSprite.spriteFrame=new cc.SpriteFrame(e)}catch(e){cc.log(e),t.avatarImgSprite.node.active=!1}},a.src=e}catch(e){cc.log(e),this.avatarImgSprite.node.active=!1}}}),cc._RF.pop()},{}],GameRankingList:[function(e,t,a){"use strict";cc._RF.push(t,"a0ea2Faum1JDKkSr0Ka631L","GameRankingList"),cc.Class({extends:cc.Component,properties:{rankingScrollView:cc.ScrollView,scrollViewContent:cc.Node,prefabRankItem:cc.Prefab,prefabGameOverRank:cc.Prefab,gameOverRankLayout:cc.Node,loadingLabel:cc.Node},start:function(){var t=this;this.removeChild(),window.wx.onMessage(function(e){cc.log("接收主域发来消息：",e),0==e.messageType?t.removeChild():1==e.messageType?t.fetchFriendData(e.MAIN_MENU_NUM):3==e.messageType?t.submitScore(e.MAIN_MENU_NUM,e.score):4==e.messageType?t.gameOverRank(e.MAIN_MENU_NUM):5==e.messageType&&t.fetchGroupFriendData(e.MAIN_MENU_NUM,e.shareTicket)})},submitScore:function(t,a){window.wx.getUserCloudStorage({keyList:[t],success:function(e){console.log("getUserCloudStorage","success",e),0!=e.KVDataList.length&&e.KVDataList[0].value>a||window.wx.setUserCloudStorage({KVDataList:[{key:t,value:""+a}],success:function(e){console.log("setUserCloudStorage","success",e)},fail:function(e){console.log("setUserCloudStorage","fail")},complete:function(e){console.log("setUserCloudStorage","ok")}})},fail:function(e){console.log("getUserCloudStorage","fail")},complete:function(e){console.log("getUserCloudStorage","ok")}})},removeChild:function(){this.node.removeChildByTag(1e3),this.rankingScrollView.node.active=!1,this.scrollViewContent.removeAllChildren(),this.gameOverRankLayout.active=!1,this.gameOverRankLayout.removeAllChildren(),this.loadingLabel.getComponent(cc.Label).string="玩命加载中...",this.loadingLabel.active=!0},fetchFriendData:function(t){var c=this;this.removeChild(),this.rankingScrollView.node.active=!0,wx.getUserInfo({openIdList:["selfOpenId"],success:function(e){c.loadingLabel.active=!1,console.log("success",e.data);var r=e.data[0];wx.getFriendCloudStorage({keyList:[t],success:function(e){console.log("wx.getFriendCloudStorage success",e);var t=e.data;t.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var a=0;a<t.length;a++){var n=t[a],i=cc.instantiate(c.prefabRankItem);if(i.getComponent("RankItem").init(a,n),c.scrollViewContent.addChild(i),t[a].avatarUrl==r.avatarUrl){var o=cc.instantiate(c.prefabRankItem);o.getComponent("RankItem").init(a,n),o.y=-354,c.node.addChild(o,1,1e3)}}t.length<=8&&(c.scrollViewContent.getComponent(cc.Layout).resizeMode=cc.Layout.ResizeMode.NONE)},fail:function(e){console.log("wx.getFriendCloudStorage fail",e),c.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})},fail:function(e){c.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})},fetchGroupFriendData:function(t,a){var c=this;this.removeChild(),this.rankingScrollView.node.active=!0,wx.getUserInfo({openIdList:["selfOpenId"],success:function(e){console.log("success",e.data);var r=e.data[0];wx.getGroupCloudStorage({shareTicket:a,keyList:[t],success:function(e){console.log("wx.getGroupCloudStorage success",e),c.loadingLabel.active=!1;var t=e.data;t.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var a=0;a<t.length;a++){var n=t[a],i=cc.instantiate(c.prefabRankItem);if(i.getComponent("RankItem").init(a,n),c.scrollViewContent.addChild(i),t[a].avatarUrl==r.avatarUrl){var o=cc.instantiate(c.prefabRankItem);o.getComponent("RankItem").init(a,n),c.node.addChild(o,1,1e3)}}t.length<=8&&(c.scrollViewContent.getComponent(cc.Layout).resizeMode=cc.Layout.ResizeMode.NONE)},fail:function(e){console.log("wx.getFriendCloudStorage fail",e),c.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})},fail:function(e){c.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})},gameOverRank:function(t){var g=this;this.removeChild(),this.gameOverRankLayout.active=!0,wx.getUserInfo({openIdList:["selfOpenId"],success:function(e){cc.log("success",e.data);var l=e.data[0];wx.getFriendCloudStorage({keyList:[t],success:function(e){cc.log("wx.getFriendCloudStorage success",e),g.loadingLabel.active=!1;var t=e.data;t.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var a=0;a<t.length;a++)if(t[a].avatarUrl==l.avatarUrl){if(0<=a-1){if(a+1>=t.length&&0<=a-2){var n=cc.instantiate(g.prefabGameOverRank);n.getComponent("GameOverRank").init(a-2,t[a-2]),g.gameOverRankLayout.addChild(n)}var i=cc.instantiate(g.prefabGameOverRank);i.getComponent("GameOverRank").init(a-1,t[a-1]),g.gameOverRankLayout.addChild(i)}else if(a+2>=t.length){var o=new cc.Node;o.width=200,g.gameOverRankLayout.addChild(o)}var r=cc.instantiate(g.prefabGameOverRank);if(r.getComponent("GameOverRank").init(a,t[a],!0),g.gameOverRankLayout.addChild(r),a+1<t.length){var c=cc.instantiate(g.prefabGameOverRank);if(c.getComponent("GameOverRank").init(a+1,t[a+1]),g.gameOverRankLayout.addChild(c),a-1<0&&a+2<t.length){var s=cc.instantiate(g.prefabGameOverRank);s.getComponent("GameOverRank").init(a+2,t[a+2]),g.gameOverRankLayout.addChild(s)}}}},fail:function(e){console.log("wx.getFriendCloudStorage fail",e),g.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})},fail:function(e){g.loadingLabel.getComponent(cc.Label).string="数据加载失败，请检测网络，谢谢。"}})}}),cc._RF.pop()},{}],RankItem:[function(e,t,a){"use strict";cc._RF.push(t,"dd553fmL+BGfJ9idSJ4ApIP","RankItem"),cc.Class({extends:cc.Component,name:"RankItem",properties:{backSprite:cc.Node,rankLabel:cc.Label,avatarImgSprite:cc.Sprite,nickLabel:cc.Label,topScoreLabel:cc.Label},start:function(){},init:function(e,t){var a=t.avatarUrl,n=t.nickname,i=0!=t.KVDataList.length?t.KVDataList[0].value:0;e%2==0&&(this.backSprite.color=new cc.Color(55,55,55,255)),0==e?this.rankLabel.node.setScale(1):1==e?this.rankLabel.node.setScale(1):2==e&&this.rankLabel.node.setScale(1),this.rankLabel.string=(e+1).toString(),this.createImage(a),this.nickLabel.string=n,this.topScoreLabel.string=i.toString()},createImage:function(e){var t=this;try{var a=wx.createImage();a.onload=function(){try{var e=new cc.Texture2D;e.initWithElement(a),e.handleLoadedTexture(),t.avatarImgSprite.spriteFrame=new cc.SpriteFrame(e)}catch(e){cc.log(e),t.avatarImgSprite.node.active=!1}},a.src=e}catch(e){cc.log(e),this.avatarImgSprite.node.active=!1}}}),cc._RF.pop()},{}]},{},["GameOverRank","GameRankingList","RankItem"]);