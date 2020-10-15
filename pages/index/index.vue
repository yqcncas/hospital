<template>
	<view class="index">
		<view class="index-tabbar">
			<view class="index-tabbar-button" :class="{active: currentIndex == 0}" @click="handleCurrentIndex(0)">待执行</view>
			<view class="index-tabbar-button" :class="{active: currentIndex == 1}" @click="handleCurrentIndex(1)">进行中</view>
		</view>
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
			<swiper style="height: calc(100vh);" @change="handleSwiper" :current="currentIndex">
			 
				<swiper-item class="index-executory-task-box">
					<scroll-view scroll-y="true" style="height: calc(100vh);" @scrolltolower = "waitlower">
						<view class="wait-showbox" v-if="waitShowFlag">
							<view class="index-executory-task" >
									<view class="index-executory-task-item" v-for="(item, index) in waitList" :key = "index" @click="goToWorkDetail(item.id, 0)">
										<view class="index-executory-task-item-top">
											<view class="index-executory-task-item-top-left">任务编号</view>
											<view class="index-executory-task-item-top-right">{{item.eventId}}</view>
										</view>
										<view class="index-executory-task-item-top">
											<view class="index-executory-task-item-top-left">创建时间</view>
											<view class="index-executory-task-item-top-right">{{item.createTime}}</view>
										</view>
										<view class="index-executory-task-item-center">
											<view class="index-executory-task-item-center-left" >
												<view class="index-executory-task-item-center-left-taskclass">任务分类</view>
												<view class="index-executory-task-item-center-left-taskname">{{item.twoTaskType ? item.twoTaskType : item.oneTaskType}}</view>
											</view>
											<view class="index-executory-task-item-center-right">
												<view class="index-executory-task-item-center-left-taskclass">起始地点</view>
												<view class="index-executory-task-item-center-left-taskname">{{item.startAddress}}</view>
											</view>
											
										</view>
										
										<view class="index-executory-task-item-center">
											<view class="index-executory-task-item-center-left" >
												<view class="index-executory-task-item-center-left-taskclass">病人床号</view>
												<view class="index-executory-task-item-center-left-taskname">{{item.ch ? item.ch : '暂无数据'}}</view>
											</view>
											<view class="index-executory-task-item-center-right">
												<view class="index-executory-task-item-center-left-taskclass">交通工具</view>
												<view class="index-executory-task-item-center-left-taskname">{{item.sjfs ? item.sjfs : '暂无数据'}}</view>
											</view>
											
										</view>
										<view class="index-executory-task-item-center">
											<view class="index-executory-task-item-center-left" >
												<view class="index-executory-task-item-center-left-taskclass">病人姓名</view>
												<view class="index-executory-task-item-center-left-taskname">{{item.xm ? item.xm : '暂无数据'}}</view>
											</view>
										</view>
										
										
										<view class="progress">
											<view class="progress-line"></view>
											<view class="progress-dotone active">
												<view>待执行</view>
											</view>
											<view class="progress-dottwo " >
												<view>进行中</view>
											</view>
											<view class="progress-dotthree">
												<view>已完成</view>
											</view>
										</view>
								
										<view class="submit-button">
											<view class="submit-button-topline"></view>
											<view class="submit-button-box">
												<view class="submit-button-left" @click.stop="refuseOrder(item.id)">拒单</view>
												<view class="submit-button-right" @click.stop="addOrder(item.id)">开始</view>
											</view>
											
										</view>
										<view class="task-tip" :style="{backgroundImage: item.agreedFlag ? `url(../../static/image/9.png)` : `url(../../static/image/10.png)` }">
											<view>{{item.agreedFlag ? '预约任务' : '即时任务'}}</view>
										</view>
										
									</view>
								</view>
							<uniLoadMore bgColor="rgba(247, 247, 250)" :status="waithasFlag ? 'loading' : 'noMore'"></uniLoadMore>
						</view>
						<u-empty text="暂无任务" mode="list" v-if="!waitShowFlag"></u-empty>
					
					</scroll-view>
				
				</swiper-item>
				<swiper-item class="index-executory-task-box">
					<scroll-view scroll-y="true" style="height: calc(100vh);" @scrolltolower = "inglower" >
						<view class="ing-showBox" v-if="ingShowFlag">
							<view class="index-executory-task" >
								<view class="index-executory-task-item" v-for="(item, index) in ingList" :key = "index" @click="goToWorkDetail(item.id, 1)">
									<view class="index-executory-task-item-top">
										<view class="index-executory-task-item-top-left">任务编号</view>
										<view class="index-executory-task-item-top-right">{{item.eventId}}</view>
									</view>
									<view class="index-executory-task-item-top">
										<view class="index-executory-task-item-top-left">创建时间</view>
										<view class="index-executory-task-item-top-right">{{item.createTime}}</view>
									</view>
									<view class="index-executory-task-item-center">
										<view class="index-executory-task-item-center-left" >
											<view class="index-executory-task-item-center-left-taskclass">任务分类</view>
											<view class="index-executory-task-item-center-left-taskname">{{item.twoTaskType ? item.twoTaskType : item.oneTaskType}}</view>
										</view>
										<view class="index-executory-task-item-center-right">
											<view class="index-executory-task-item-center-left-taskclass">起始地点</view>
											<view class="index-executory-task-item-center-left-taskname">{{item.startAddress}}</view>
										</view>
										
									</view>
									
									<view class="progress">
										<view class="progress-nline"></view>
										<view class="progress-dotone active">
											<view>待执行</view>
										</view>
										<view class="progress-dottwo active" >
											<view>进行中</view>
										</view>
										<view class="progress-dotthree ">
											<view>已完成</view>
										</view>
									</view>
					
									<view class="submit-button">
										<view class="submit-button-topline"></view>
										<view class="submit-success-box">
											<view class="success-timer">
												<view class="success-timer-left">完成时间</view>
												<view class="success-timer-right">{{item.finishTime ? item.finishTime : '暂无'}}</view>
											</view>
											<view class="submit-success-button" @click.stop="successOrder(item.id)">完成任务</view>
										</view>
										
										<!-- <view class="submit-button-box">
											<view class="submit-button-left">拒单</view>
											<view class="submit-button-right">开始</view>
										</view> -->
										
									</view>
									<view class="task-tip" :style="{backgroundImage: item.agreedFlag ? `url(../../static/image/9.png)` : `url(../../static/image/10.png)` }">
										<view>{{item.agreedFlag ? '预约任务' : '即时任务'}}</view>
									</view>
									
								</view>
							</view>
							<uniLoadMore bgColor="rgba(247, 247, 250)" :status="inghasFlag ? 'loading' : 'noMore'"></uniLoadMore>
						</view>
						<u-empty text="暂无任务" mode="list" v-if="!ingShowFlag"></u-empty>
					</scroll-view>
				
				</swiper-item>
			  
			</swiper>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				currentIndex: 0,
				// 列表传参
				waithasFlag: true,
				inghasFlag: true,
				waitPageNum: 0,
				waitPageSize: 10,
				ingPageNum: 0,
				ingPageSize: 10,
				//有无数据
				waitShowFlag: true,
				ingShowFlag: true,
				// 数据列
				waitList: [],
				ingList: [],
				// 任务
				taskEnum: [],
				upOption: {
					use: false
				}
				
			}
		},
		onLoad() {
			this.getStatus()
			// this.myWaitTask()
			// this.myIngTask()
			
		},
		onShow() {
			if (uni.getStorageSync('refushFlag')) {
				uni.removeStorageSync('refushFlag')
				this.waitShowFlag = true
				this.waitPageNum = 0
				this.waitShowFlag = true
				this.waitList = []
				this.myWaitTask()
			}
			if (uni.getStorageSync('workFlag')) {
				uni.removeStorageSync('workFlag')
				this.handleCurrentIndex(1)
			}
			if (uni.getStorageSync('successOrderFlag') && this.currentIndex == 1) {
				uni.removeStorageSync('successOrderFlag')
				this.handleCurrentIndex(1)
			}
		},
		onTabItemTap () {
			if (this.currentIndex) {
				this.inghasFlag = true
				this.ingPageNum = 0
				this.ingShowFlag = true
				this.ingList = []
				this.myIngTask()
			} else {
				this.waithasFlag = true
				this.waitPageNum = 0
				this.waitShowFlag = true
				this.waitList = []
				this.myWaitTask()
			}
		},
		methods: {
			// 下拉刷新
			downCallback () {
				if (this.currentIndex) {
					this.inghasFlag = true
					this.ingPageNum = 0
					this.ingShowFlag = true
					this.ingList = []
					this.myIngTask()
				} else {
					this.waithasFlag = true
					this.waitPageNum = 0
					this.waitShowFlag = true
					this.waitList = []
					this.myWaitTask()
				}
				this.mescroll.endDownScroll()
			},
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
								this.ingList = []
								this.ingShowFlag = false
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// 数据
			async myWaitTask() {
				if (!this.waithasFlag) return
				this.waitPageNum = ++this.waitPageNum
				let res = await this.$fetch(this.$api.list_and_task, {taskStatus: 1, pageNum: this.waitPageNum, pageSize: 10}, "GET", 'FORM')
				
				
				// if (res.total) {
				// 	res.rows.forEach(item => {
				// 		this.taskEnum.forEach((it, index) => {
				// 			if (item.task.oneTaskType == it.id){
				// 				// item.taskName = this.taskEnum[index].name
				// 				this.$set(item, 'taskName', this.taskEnum[index].name)
				// 			}
				// 			if (item.task.twoTaskType != '') {
				// 				it.children.forEach((j, k) => {
				// 					// console.log(j)
				// 					if (item.task.twoTaskType == j.id) {
				// 						// item.taskName = j.name
				// 						// console.log(k)
				// 						this.$set(item, 'taskName', j.name)
				// 					}
				// 				}) 
				// 			}
				// 		})
				// 	})
				// }
				// setTimeout(() => {
					console.log(res.rows)
					this.waitList = [...this.waitList, ...res.rows]
					let obj = {}
					this.waitList = this.waitList.reduce((cur,next) => {
					    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					    return cur;
					},[]) //设置cur默认类型为数组，并且初始值为空的数组
					this.waithasFlag = this.waitPageNum * 10 < res.total
				// }, 1400)
				if (res.total == 0) {
					this.waitShowFlag = false
				} else {
					this.waitShowFlag = true
				}
				
		
				
				
				
			},
			async myIngTask () {
				if (!this.inghasFlag) return
				this.ingPageNum = ++this.ingPageNum
				let res = await this.$fetch(this.$api.list_and_task, {taskStatus: 2,pageNum: this.ingPageNum, pageSize: 10}, "GET", 'FORM')
				
				
				// if (res.total) {
				// 	res.rows.forEach(item => {
				// 		this.taskEnum.forEach((it, index) => {
				// 			if (item.task.oneTaskType == it.id){
				// 				// item.taskName = this.taskEnum[index].name
				// 				this.$set(item, 'taskName', this.taskEnum[index].name)
				// 			}
				// 			if (item.task.twoTaskType != '') {
				// 				it.children.forEach((j, k) => {
				// 					// console.log(j)
				// 					if (item.task.twoTaskType == j.id) {
				// 						// item.taskName = j.name
				// 						// console.log(k)
				// 						this.$set(item, 'taskName', j.name)
				// 					}
				// 				}) 
				// 			}
				// 		})
				// 	})
				// }
				
				// setTimeout(() => {
					this.ingList = [...this.ingList, ...res.rows]
					console.log(this.ingList)
					let obj = {};
					// 要去重的数组
					this.ingList = this.ingList.reduce((cur,next) => {
					    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					    return cur;
					},[]) //设置cur默认类型为数组，并且初始值为空的数组	
					console.log(this.ingList)
					this.inghasFlag = this.ingPageNum * 10 < res.total
				// }, 1400)
				
				if (res.total == 0) {
					this.ingShowFlag = false
				} else {
					this.ingShowFlag = true
				}
				
			},
			// 任务
			async getStatus () {
				let res = await this.$fetch(this.$api.list_enum, {}, 'GET', 'FORM')
		
				this.taskEnum = res.data
			},
			
			// 点击tab
			handleCurrentIndex(index) {
				if (index == 0) {
					this.waithasFlag = true
					this.waitPageNum = 0
					// this.waitShowFlag = true
					// this.waitList = []
					this.myWaitTask()
				} else {
					this.inghasFlag = true
					this.ingPageNum = 0
					// this.ingShowFlag = true
					// this.ingList = []
					this.myIngTask()
				}
				this.currentIndex = index
			},
			// 滑动
			handleSwiper (e) {
				this.handleCurrentIndex(e.detail.current)
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
			addOrder (id) {
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
								
								this.handleCurrentIndex(1)
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			goToWorkDetail (id, type) {
				uni.navigateTo({
					url: '../Work/WorkDetail?orderId=' + id + '&type=' + type
				})
			},
			waitlower () {
				this.myWaitTask()
			},
			inglower () {
				this.myIngTask()
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247, 247, 250);
	}
.index{
	.index-tabbar{
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
		position: fixed;
		z-index: 999;
		.index-tabbar-button{
			flex: 1;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: rgba(0,0,0,0.85);
			position: relative;
			&::after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4rpx solid #1DB7BC;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				transition: .3s;
			}
			&:nth-child(1){
				border-right: 1rpx solid #f2f2f2;
			}
			&.active{
				
				color: #1DB7BC;
				&::after{
					width: 30%;
				}
			}
		}
	}
	
	.index-executory-task-box{
		.index-executory-task{
			padding-top: 90rpx;
			.index-executory-task-item{
				
				width: 690rpx;
				padding: 30rpx;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				margin: 0 auto;
				margin-top: 30rpx;
				box-sizing: border-box;
				position: relative;
				.index-executory-task-item-top{
					display: flex;
					padding-bottom: 10rpx;
					box-sizing: border-box;
					.index-executory-task-item-top-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #A2A2A2;
					}
					.index-executory-task-item-top-right{
						flex: 1;
						word-break: break-all;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.index-executory-task-item-center{
					display: flex;
					align-items: center;
					padding-top: 10rpx;
					padding-bottom: 22rpx;
					box-sizing: border-box;
					.index-executory-task-item-center-right{
						// margin-left: 92rpx;
						justify-content: flex-end;
					}
					.index-executory-task-item-center-left, .index-executory-task-item-center-right{
						flex: 1;
						display: flex;
						align-items: center;
						.index-executory-task-item-center-left-taskclass{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
							white-space: nowrap;
						}
						.index-executory-task-item-center-left-taskname{
							// width: 112rpx;
							// white-space: nowrap;
							// overflow: hidden;
							// text-overflow: ellipsis;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
							margin-left: 30rpx;
						}
					}
				}
				.progress{
					width: 92%;
					height: 6rpx;
					background: #D8D8D8;
					margin: 0 auto;
					position: relative;
					.progress-line{
						width: 0%;
						height: 100%;
						background-image: linear-gradient(90deg, #F7B500 0%, #1DB7BC 100%);
						border-radius: 2px;
						position: absolute;
					}
					.progress-nline{
						width: 50%;
						height: 100%;
						background-image: linear-gradient(90deg, #F7B500 0%, #1DB7BC 100%);
						border-radius: 2px;
						position: absolute;
					}
					.progress-dotone{
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						
						background-color: #D8D8D8;
						white-space: nowrap;
						&.active{
							background: #F7B501;
							view{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #1DB7BC;
							}
						}
						view{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.85);
							transform: translateX(-150%);
							padding-top: 30rpx;
						}
					}
					.progress-dottwo{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translateY(-50%);
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						background-color: #D8D8D8;
						white-space: nowrap;
						&.active{
							background: #8FB659;
							view{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #1DB7BC;
							}
						}
						view{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.85);
							transform: translateX(-150%);
							padding-top: 30rpx;
						}
					}
					.progress-dotthree{
						position: absolute;
						left: 100%;
						top: 50%;
						transform: translateY(-50%);
						width: 16rpx;
						height: 16rpx;
						border-radius: 50%;
						
						background-color: #D8D8D8;
						white-space: nowrap;
						&.active{
							background: #1DB7BC;
							view{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: #1DB7BC;
							}
						}
						view{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.85);
							transform: translateX(-200%);
							padding-top: 30rpx;
						}
					}
				}
				.submit-button{
					padding-top: 78rpx;
					
					box-sizing: border-box;
					.submit-button-topline{
						width: 630rpx;
						height: 2rpx;
						background: #F0F0F0;
						border-radius: 0.5px;
					
						
					}
					.success-timer{
						padding-top: 24rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						.success-timer-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
						}
						.success-timer-right{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
					.submit-button-box{
						width: 100%;
						display: flex;
						align-items: center;
						padding-top: 26rpx;
						justify-content: space-around;
						.submit-button-left,.submit-button-right{
							width: 280rpx;
							height: 70rpx;
							border-radius: 17.5px;
							box-sizing: border-box;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.submit-button-left{
							border: 1px solid #A2A2A2;
							background-color: #fff;
						}
						.submit-button-right{
							background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
							color: #FFFFFF;
						}
						.submit-button-left{
							color: #A2A2A2;
						}
					}
					.submit-success-box{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.submit-success-button{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #FFFFFF;
							text-align: center;
							padding: 8rpx 20rpx;
							box-sizing: border-box;
							background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
							border-radius: 25rpx;
							transform: translateY(10rpx);
						}
					}
				}
				.task-tip{
					position: absolute;
					right: 30rpx;
					top: 0;
					width: 108rpx;
					height: 56rpx;
					// background-image: url(../../static/image/9.png);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					font-family: PingFangSC-Regular;
					font-size: 11px;
					color: #FFFFFF;
					text-align: center;
					// padding-top: 7rpx;
					view{
						padding-top: 4rpx;
					}
				}
			}
		}
		
	}

}
</style>
