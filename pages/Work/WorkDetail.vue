<template>
	<view class="work-detail">
		<view class="work-detail-header">
			<!-- 四个状态 -->
			<!-- <view class="progress-box">
				<view class="progress-bar">
					<view class="progress-bar-line"></view>
					<view class="progress-bar-dotone progress-bar-dot">
						<view class="progress-bar-text">待执行</view>
					</view>
					<view class="progress-bar-dottwo progress-bar-dot">
						<view class="progress-bar-text">进行中</view>
					</view>
					<view class="progress-bar-dotthree progress-bar-dot">
						<view class="progress-bar-text">返回中</view>
					</view>
					<view class="progress-bar-dotfour progress-bar-dot">
						<view class="progress-bar-text">已完成</view>
					</view>
				</view>
			</view> -->
			<!-- 三个状态 -->
			<view class="progress-box">
				<view class="progress-bar">
					<view class="progress-bar-line" :style="{width: type == 0 ? '0%' : type == 1 && workInfo.orderProgress != 4 ? '50%' :  '100%'}"></view>
					<view class="progress-bar-dotone progress-bar-dot active" >
						<view class="progress-bar-text">待执行</view>
					</view>
					<view class="progress-bar-ndottwo progress-bar-dot" :class="{active: type > 0 && type <= 2}">
						<view class="progress-bar-text">进行中</view>
					</view>
		
					<view class="progress-bar-ndotfour progress-bar-dot" :class="{active: type == 2 || workInfo.orderProgress == 4}">
						<view class="progress-bar-text">已完成</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="distribution-info">
			<view class="distribution-info-header">
				<view class="distribution-info-header-left-tip"></view>
				<view class="distribution-info-header-left-title">派发信息</view>
			</view>
			<view class="distribution-info-center">
				<view class="distribution-info-center-item">
					<view class="distribution-info-center-item-left">派发人姓名</view>
					<view class="distribution-info-center-item-right">{{workInfo.nickName}}</view>
				</view>
				<view class="distribution-info-center-item">
					<view class="distribution-info-center-item-left">派发人电话</view>
					<view class="distribution-info-center-item-right">{{workInfo.phonenumber}}</view>
				</view>
			</view>
		</view>
		<view class="task-info">
			<view class="task-info-header">
				<view class="task-info-header-tip"></view>
				<view class="task-info-header-title">任务信息</view>
			</view>
			<view class="task-info-center">
				<view class="task-info-center-timer">
					<view class="task-info-center-timer-create"><text>创建时间</text>{{workInfo.createTime}}</view>
					<view class="task-info-center-timer-create"><text>开始时间</text>{{workInfo.startTime ? workInfo.startTime : '暂无'}}</view>
					<view class="task-info-center-timer-create"><text>完成时间</text>{{workInfo.finishTime ? workInfo.finishTime : '暂无'}}</view>
					<view class="task-info-center-timer-create" v-if="workInfo.agreedTime"><text>预约时间</text>{{workInfo.agreedTime}}</view>
				</view>
				<view class="task-info-center-detail">
					<view class="task-info-center-detail-item" >
						<view class="task-info-center-detail-item-left">任务分类</view>
						<view class="task-info-center-detail-item-right">{{workInfo.twoTaskType ? workInfo.twoTaskType : workInfo.oneTaskType}}</view>
					</view>
					<view class="task-info-center-detail-item">
						<view class="task-info-center-detail-item-left">起始地点</view>
						<view class="task-info-center-detail-item-right">{{workInfo.startAddress}}</view>
					</view>
					<view class="task-info-center-detail-item">
						<view class="task-info-center-detail-item-left">送达地址</view>
						<view class="task-info-center-detail-item-right">{{workInfo.endAddress}}</view>
					</view>
					<view class="task-info-center-detail-item">
						<view class="task-info-center-detail-item-left">任务积分</view>
						<view class="task-info-center-detail-item-right">{{workInfo.taskIntegral ? workInfo.taskIntegral : 0}}分</view>
					</view>
				</view>
			</view>
			<view class="remark">
				<view class="remark-left">任务备注</view>
				<view class="remark-right">{{workInfo.remark}}</view>
			</view>
		</view>
		<view class="submit-button" v-if="type == 0">
			<view class="submit-button-left" role = "button" @click="refuseOrder(workInfo.id)">拒单</view>
			<view class="submit-button-right" role = "button" @click="startTask(workInfo.id)">开始</view>
		</view>
		<view class="submit-button" v-if="type == 1 && workInfo.orderProgress != 4">
			<view class="submit-button-right" role = "button" @click="successOrder(workInfo.id)">完成任务</view>
		</view>
	</view>
</template>

<script>
	var mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
	export default {
		onLoad(options) {
			this.getStatus()
			this.orderId = options.orderId
			this.type = options.type
			// console.log(this.$refs.progressline.$el.style.width)
			this.initWorkDetail()
			if (this.type == 1) {
				// console.log('1313131')
				
				// 修改buttons    
				//index: 按钮索引 在第几位, style {WebviewTitleNViewButtonStyles }  
				//   var webView = this.$mp.page.$getAppWebview();
				//    webView.setTitleNViewButtonStyle(0, {    
				//         text: '\ue608',    
				// });
			}
		},
		// 点击扫一扫
		onNavigationBarButtonTap () {
			if (this.type != 1) return uni.showToast({
				icon: 'none',
				title: '该状态下无法扫码，请在进行的任务里操作'
			})
			mpaasScanModule.mpaasScan({
					// 扫码 UI 风格，参数可为 qr、bar，默认为 qr
					'type': 'qr',
					// 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
					'scanType':  ['qrCode','barCode'],
					// 是否隐藏相册，默认false不隐藏
					'hideAlbum': true
				},
				async (ret) => {
					
					// uni.showModal({
					// 	title: "弹窗标题",
					// 	// 返回值中，resp_code 表示返回结果值，10：用户取消，11：其他错误，1000：成功
					// 	// 返回值中，resp_message 表示返回结果信息
					// 	// 返回值中，resp_result 表示扫码结果，只有成功才会有返回
					// 	content: ret.resp_result,
					// 	showCancel: false,
					// 	confirmText: "确定"
					// })
					console.log(ret.resp_result)
					console.log(this.orderId)
					if (ret.resp_result != undefined) {
						let res = await this.$fetch(this.$api.order_address_clock_in, {address: ret.resp_result, orderId: this.orderId}, "PUT", 'FORM')
						console.log(res)
						
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						if (res.code == 200) {
							this.initWorkDetail()
						}
					}
					
					
				})
		},
		
		data () {
			return {
				orderId: '',
				type: 0, // 0 待执行 1进行中 2已完成
				workInfo: {},
				taskEnum: [],
			}
		},
		methods: {
			// 完成任务
			 successOrder (id) {
				uni.showModal({
				    title: '提示',
				    content: '是否已完成任务',
				    success: async (res) => {
				        if (res.confirm) {
				            let msg = await this.$fetch(this.$api.finish_order, {orderId: id}, "PUT", 'FORM')
							uni.showToast({
								icon: 'none',
								title: msg.msg
							})
							if (msg.code == 200) {
								uni.setStorageSync('successOrderFlag', true)
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 500)
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				
			},
			async initWorkDetail () {
				
				let res = await this.$fetch(this.$api.list_and_task_by_id, {orderId: Number(this.orderId)}, "GET", 'FORM')
				this.workInfo = res.data[0]
				if(this.workInfo.orderProgress == 4) {
					uni.setStorageSync('successOrderFlag', true)
				}
				
				// if (res.data.length) {
				
				// 		this.taskEnum.forEach((it, index) => {
				// 			if (this.workInfo.task.oneTaskType == it.id){
				// 				// this.workInfo.taskName = this.taskEnum[index].name
				// 				this.$set(this.workInfo, 'taskName', this.taskEnum[index].name)
				// 			}
				// 			if (this.workInfo.task.twoTaskType != '') {
				// 				it.children.forEach((j, k) => {
				// 					// console.log(j)
				// 					if (this.workInfo.task.twoTaskType == j.id) {
				// 						// this.workInfo.taskName = j.name
				// 						// console.log(k)
				// 						this.$set(this.workInfo, 'taskName', j.name)
				// 					}
				// 				}) 
				// 			}
				// 		})
					
				// }
				
				
				console.log(res)
			},
			async getStatus () {
				let res = await this.$fetch(this.$api.list_enum, {}, 'GET', 'FORM')
					
				this.taskEnum = res.data
			},
			startTask (id) {
				uni.showModal({
				    title: '提示',
				    content: '是否确定开始该任务',
				    success: async (res) => {
				        if (res.confirm) {
				            // console.log('用户点击确定');
							let msg = await this.$fetch(this.$api.start_order, {orderId: id}, "PUT", 'form')
							uni.showToast({
								icon: 'none',
								title: msg.msg
							})
							if (msg.code == 200) {
								uni.setStorageSync('workFlag', true)
								uni.navigateBack({
									delta: 1
								})
								
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 拒单
			refuseOrder (id) {
				uni.showModal({
				    title: '提示',
				    content: '是否确定拒绝该任务',
				    success: function (res) {
				        if (res.confirm) {
							uni.navigateTo({
								url: '../Work/RefuseWork?orderId=' + id
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.work-detail{
		// padding-bottom: 60rpx;
		padding-bottom: 200rpx;
		.work-detail-header{
			width: 100%;
			height: 130rpx;
			background: #FFFFFF;
			box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
			.progress-box{
				width: 100%;
				display: flex;
				justify-content: center;
				padding-top: 36rpx;
				box-sizing: border-box;
				.progress-bar{
					width: 544rpx;
					height: 4rpx;
					background: #D8D8D8;
					position: relative;
					.progress-bar-line{
						width: 50%;
						height: 100%;
						background-image: linear-gradient(90deg, #F7B500 0%, #1DB7BC 100%);
						position: absolute;
					}
					.progress-bar-dot{
						width: 16rpx;
						height: 16rpx;
						
						border-radius: 50%;
					}
					.progress-bar-text{
						white-space : nowrap;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: rgba(0,0,0,0.85);
						transform: translate(-150%, 30rpx);
					}
					.progress-bar-dotone{
						
						background-color: #D8D8D8;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #F7B501;
							view{
								color: #1DB7BC;
							}
						}
						
					}
					.progress-bar-dottwo{
						background-color: #D8D8D8;
						position: absolute;
						left: 33%;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #8CB55B;
							view{
								color: #1DB7BC;
							}
						}
					}
					.progress-bar-ndottwo{
						
						background-color: #D8D8D8;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #8CB55B;
							view{
								color: #1DB7BC;
							}
						}
					}
					.progress-bar-dotthree{
						
						background-color: #D8D8D8;
						position: absolute;
						left: 66%;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #53b68d;
							view{
								color: #1DB7BC;
							}
						}
					}
					.progress-bar-dotfour{
						
						background-color: #D8D8D8;
						position: absolute;
						left: 100%;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #1DB7BC;
							view{
								color: #1DB7BC;
							}
						}
					}
					.progress-bar-ndotfour{
						
						background-color: #D8D8D8;
						position: absolute;
						left: 100%;
						top: 50%;
						transform: translateY(-50%);
						&.active{
							background: #1DB7BC;
							view{
								color: #1DB7BC;
							}
						}
					}
				}
			}
			
		}
		.distribution-info{
			width: 690rpx;
			// height: 252rpx;
			background: #FFFFFF;
			box-shadow: 0 2px 7px 0 rgba(0,0,0,0.03);
			border-radius: 7px;
			margin: 0 auto;
			margin-top: 30rpx;
			padding-right: 30rpx;
			box-sizing: border-box;
			.distribution-info-header{
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				
				.distribution-info-header-left-tip{
					width: 4rpx;
					height: 28rpx;
					background: #1DB7BC;
					border-radius: 0 100px 100px 0;
					box-sizing: border-box;
				}
				.distribution-info-header-left-title{
					height: 100%;
					line-height: 90rpx;
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #000000;
					margin-left: 30rpx;
					box-sizing: border-box;
					border-bottom: 1rpx solid #f2f2f2;
				}	
				
			}
			.distribution-info-center{
				padding-bottom: 30rpx;
				.distribution-info-center-item{
					display: flex;
					align-items: center;
					&:nth-child(1){
						.distribution-info-center-item-left{
							padding: 30rpx;
						}
					}
					&:nth-child(2){
						.distribution-info-center-item-left{
							padding-left: 30rpx;
							padding-right: 30rpx;
							
						}
					}
					.distribution-info-center-item-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #A2A2A2;
						
					}
					.distribution-info-center-item-right{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
					}
				}
			}
		}
		.task-info{
			width: 690rpx;
			// height: 252rpx;
			background: #FFFFFF;
			box-shadow: 0 2px 7px 0 rgba(0,0,0,0.03);
			border-radius: 7px;
			margin: 0 auto;
			margin-top: 30rpx;
			padding-right: 30rpx;
			box-sizing: border-box;
			.task-info-header{
				display: flex;
				align-items: center;
				.task-info-header-tip{
					width: 4rpx;
					height: 28rpx;
					background: #1DB7BC;
					border-radius: 0 100px 100px 0;
					box-sizing: border-box;
				}
				.task-info-header-title{
					height: 100%;
					line-height: 90rpx;
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #000000;
					margin-left: 30rpx;
				
					box-sizing: border-box;
					border-bottom: 1rpx solid #f2f2f2;
					
				}
			}
			.task-info-center{
				padding-left: 30rpx;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				box-sizing: border-box;
				.task-info-center-timer{
					border-bottom: 1rpx solid #f2f2f2;
					
					.task-info-center-timer-create{
						display: flex;
						align-items: center;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
						&:nth-child(1){
							padding-bottom: 20rpx;
						}
						&:nth-child(2){
							padding-bottom: 30rpx;
						}
						&:nth-child(3){
							padding-bottom: 20rpx;
						}
						&:nth-child(4){
							padding-bottom: 30rpx;
						}
						text{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
							margin-right: 30rpx;
							box-sizing: border-box;
						}
					}
				}
				.task-info-center-detail{
					padding: 30rpx 0;
					box-sizing: border-box;
					border-bottom: 1rpx solid #f2f2f2;
					.task-info-center-detail-item{
						display: flex;
						// align-items: center;
						padding-bottom: 20rpx;
						box-sizing: border-box;
						&:nth-last-child(1){
							padding-bottom: 0;
						}
						.task-info-center-detail-item-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
							margin-right: 30rpx;
							box-sizing: border-box;
						}
						.task-info-center-detail-item-right{
							flex: 1;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
						}
					}
				}
			}
			.remark{
				display: flex;
				align-items: center;
				padding-bottom: 30rpx;
				box-sizing: border-box;
				.remark-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #A2A2A2;
					padding-left: 30rpx;
					padding-right: 30rpx;
					box-sizing: border-box;
				}
				.remark-right{
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.85);
				}
			}
		}
		.submit-button{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			
			.submit-button-left{
				// width: 50%;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				background: #FFFFFF;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #1DB7BC;
			}
			.submit-button-right{
				// width: 50%;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-family: PingFangSC-Semibold;
				font-size: 17px;
				color: #FFFFFF;
				background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
			}
		}
	}
</style>
