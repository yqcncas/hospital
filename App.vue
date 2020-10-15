<script>
	import Voice from '@/js_sdk/QuShe-baiduYY/QS-baiduyy/QS-baiduyy.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			plus.screen.lockOrientation('portrait-primary');
		
			this.$fetch(this.$api.get_baidu_token, {}, "GET", 'FORM').then(res => {
				console.log(res)
				if (res.code == 200) {
					this.tok = res.data.access_token
					uni.setStorageSync('tok', res.data.access_token)
				}
			})
			
			
			uni.getProvider({
			service: "push",
			success: (e) => {
				console.log("success", e);
				this.provider = e.provider;
				this.openPush()
			},
			fail: (e) => {
				console.log("获取推送通道失败", e);
			}
			});
			// 监听系统通知栏
			// #ifdef APP-PLUS
			plus.push.addEventListener('click',function(msg){
				console.log(msg)
			//处理点击消息的业务逻辑代码  
			let platform =  uni.getSystemInfoSync().platform
			if(platform == 'android'){
				uni.switchTab({
					url:'./pages/index/index'
				})
			}else{
				var payload;
				if (msg.type == "click") { //APP离线点击包含click属性，这时payload是JSON对象  
					payload = msg.payload;  
				} else { //APP在线，收到消息不会包含type属性,这时的payload是JSON字符串，需要转为JSON对象  
					payload = JSON.parse(msg.payload);  
				} 
				if(payload != null || payload != undefined){
					uni.switchTab({
						url:'./pages/index/index'
					})
				}
			}
			},false)
			//监听接收透传消息事件  
			plus.push.addEventListener('receive', function(msg){  
			//处理透传消息的业务逻辑代码 
			 console.log("(receive):" + JSON.stringify(msg)); 
			// plus.nativeUI.confirm(JSON.stringify(msg))
			let platform =  uni.getSystemInfoSync().platform
			//安卓处理
			if(platform == 'android'){
				// plus.nativeUI.confirm('安卓')
				var payload = JSON.parse(msg.payload)
				var messageTitle = payload.title;  
				var messageContent = payload.titleText; 
				plus.push.createMessage(messageContent,msg.payload,{title:messageTitle})
			}else{
				//ios处理
				// plus.nativeUI.confirm('ios')
				var payload = msg.payload;
				if(msg.aps == null && msg.type == "receive"){
					var messageTitle = payload.title;  
					var messageContent = payload.titleText;  
					//创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null  
					plus.push.createMessage(messageContent, JSON.stringify(payload), {title: messageTitle});
				}
			}
			if (msg.content) {
				Voice(JSON.parse(msg.payload).titleText);
			}
			
	// 		if (uni.getStorageSync('tok')) {
	
				
	// 			// var a = uni.createInnerAudioContext()
	// 			console.log(msg.content)
				
	// 			// let tex = encodeURI(encodeURI(JSON.parse(msg.payload).titleText))
	// 			// a.src = 'https://tsn.baidu.com/text2audio?cuid='+plus.push.getClientInfo().clientid+'&tex='+ tex +'&tok='+uni.getStorageSync('tok')+'&ctp=1'+'&lan=zh'
	// 		 //    a.play()
	// 		 Voice(msg.content);
	// 		}
			
			
			}, false);
			// #endif
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		data () {
			return {
				provider: [],
				tok: '',
				
			}
		},
		methods: {
			openPush() {
				uni.subscribePush({
					provider: this.provider[0],
					success: (e) => {
						console.log(e);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "static/iconfont.css";
	@import 'uview-ui/theme.scss';
	page{
		width: 100%;
	}
	::-webkit-scrollbar {
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    color: transparent;
	    background: transparent;  
	}
</style>
