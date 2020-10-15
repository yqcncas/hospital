<template>
	<view class="index">
		<view class="index-tabbar">
			<view class="index-tabbar-button" :class="{active: currentIndex == 0}" @click="handleCurrentIndex(0)">完成任务</view>
			<view class="index-tabbar-button" :class="{active: currentIndex == 1}" @click="handleCurrentIndex(1)">拒单任务</view>
		</view>
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
		<swiper style="height: calc(100vh);" @change="handleSwiper" :current="currentIndex">
			<swiper-item class="index-executory-task-box">
				<scroll-view scroll-y="true" style="height: calc(100vh);" @scrolltolower="successlower">
					<view class="success-show-box" v-if="noSuccessFlag">
						<view class="index-executory-task">
							<view class="index-executory-task-item" v-for="(item, index) in successList" :key = "index" @click="goToWorkDetail(item.id, 2)">
								<view class="index-executory-task-item-top">
									<view class="index-executory-task-item-top-left">任务编号</view>
									<view class="index-executory-task-item-top-right">{{item.eventId}}</view>
								</view>
								<view class="index-executory-task-item-top">
									<view class="index-executory-task-item-top-left">创建时间</view>
									<view class="index-executory-task-item-top-right">{{item.createTime}}</view>
								</view>
								<view class="index-executory-task-item-center">
									<view class="index-executory-task-item-center-left">
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
									<view class="progress-dotthree active">
										<view>已完成</view>
									</view>
								</view>
				
								<view class="submit-button">
									<view class="submit-button-topline"></view>
									<view class="success-timer">
										<view class="success-timer-left">完成时间</view>
										<view class="success-timer-right">{{item.finishTime ? item.finishTime : '暂无'}}</view>
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
						<uniLoadMore bgColor="rgba(247, 247, 250)" :status="successhasFlag ? 'loading' : 'noMore'"></uniLoadMore>
					</view>
					<u-empty mode="list" v-if = "!noSuccessFlag"></u-empty>
				</scroll-view>
			
			</swiper-item>
			<swiper-item class="index-executory-task-box">
				<scroll-view scroll-y="true" style="height: calc(100vh);" @scrolltolower="refuselower">
					<view class="refuse-show-box" v-if = "noRefuseFlag">
						<view class="index-executory-task">
							<view class="refuse-item" v-for="(item, index) in refuseList " :key = "index">
								<view class="refuse-header">
									<view class="refuse-header-item">
										<view class="refuse-header-item-left">任务编号</view>
										<view class="refuse-header-item-right">{{item.eventId}}</view>
									</view>
									<view class="refuse-header-item">
										<view class="refuse-header-item-left">创建时间</view>
										<view class="refuse-header-item-right">{{item.createTime}}</view>
									</view>
								</view>
								<view class="refuse-center">
									<view class="refuse-center-item">
										<view class="refuse-center-item-left">任务分类</view>
										<view class="refuse-center-item-right">{{item.twoTaskType ? item.twoTaskType : item.oneTaskType}}</view>
									</view>
									<view class="refuse-center-item">
										<view class="refuse-center-item-left">起始地点</view>
										<view class="refuse-center-item-right">{{item.startAddress}}</view>
									</view>
								</view>
								<view class="refuse-bottom">
									<view class="refuse-bottom-left">拒绝时间</view>
									<view class="refuse-bottom-right">{{item.refuseTime}}</view>
								</view>
							</view>
						</view>
					
						<uniLoadMore bgColor="rgba(247, 247, 250)" :status="refusehasFlag ? 'loading' : 'noMore'"></uniLoadMore>
					</view>
					<u-empty mode="list" v-if = "!noRefuseFlag"></u-empty>
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
				
				successhasFlag: true,
				refusehasFlag: true,
				
				noSuccessFlag: true,
				noRefuseFlag: true,
				
				successPageNum: 0,
				successPageSize: 10,
				
				refusePageNum: 0,
				refusePageSize: 10,
				
				successList: [],
				refuseList: [],
				taskEnum: [],
				upOption: {
					use: false
				}
			}
		},
		onLoad() {
			this.getStatus()
			// this.mySuccessTask()
			// this.myRefuseTask()
		},
		methods: {
			// 下拉刷新
			downCallback () {
				if (this.currentIndex) {
					this.refusehasFlag = true
					this.refusePageNum = 0
					this.noRefuseFlag = true
					this.refuseList = []
					this.myRefuseTask()
				} else {
					this.successhasFlag = true
					this.successPageNum = 0
					this.noSuccessFlag = true
					this.successList = []
					this.mySuccessTask()
				}
				this.mescroll.endDownScroll()
			},
			// 点击tab
			handleCurrentIndex(index) {
				if (index == 0) {
					this.successhasFlag = true
					this.successPageNum = 0
					// this.waitShowFlag = true
					// this.waitList = []
					this.mySuccessTask()
				} else {
					this.refusehasFlag = true
					this.refusePageNum = 0
					// this.ingShowFlag = true
					// this.ingList = []
					this.myRefuseTask()
				}
				this.currentIndex = index
				
			},
			// 滑动
			handleSwiper (e) {
				this.handleCurrentIndex(e.detail.current)
			},
			async mySuccessTask() {
				if (!this.successhasFlag) return
				this.successPageNum = ++this.successPageNum
				let res = await this.$fetch(this.$api.list_and_task, {taskStatus: 3, pageNum: this.successPageNum, pageSize: 10}, "GET", 'FORM')
			
				this.successhasFlag = this.successPageNum * 10 < res.total
				
				console.log(res)
				if (res.total == 0) {
					this.noSuccessFlag = false
				} else {
					this.noSuccessFlag = true
				}
			
				// if (res.rows.length) {
				// 	res.rows.forEach(item => {
				// 		this.taskEnum.forEach((it, index) => {
				// 			if (item.task.oneTaskType == it.id){
				// 				item.taskName = this.taskEnum[index].name
				// 			}
				// 			if (item.task.twoTaskType != '') {
				// 				it.children.forEach((j, k) => {
				// 					// console.log(j)
				// 					if (item.task.twoTaskType == j.id) {
				// 						item.taskName = j.name
				// 						// console.log(k)
				// 					}
				// 				}) 
				// 			}
				// 		})
				// 	})
				// }
				
				// setTimeout(() => {
					this.successList = [...this.successList, ...res.rows]
					
					let obj = {}
					this.successList = this.successList.reduce((cur,next) => {
					    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					    return cur;
					},[]) //设置cur默认类型为数组，并且初始值为空的数组
				// }, 1200)
				
				
				
			},
			async myRefuseTask () {
				if (!this.refusehasFlag) return
				this.refusePageNum = ++this.refusePageNum
				let res = await this.$fetch(this.$api.list_and_task, {taskStatus: 5, pageNum: this.refusePageNum, pageSize: 10}, "GET", 'FORM')
				console.log(res)
				this.refusehasFlag = this.refusePageNum * 10 < res.total
				if (res.total == 0) {
					this.noRefuseFlag = false
				} else {
					this.noRefuseFlag = true
				}
				
				// if (res.rows.length) {
				// 	res.rows.forEach(item => {
				// 		this.taskEnum.forEach((it, index) => {
				// 			if (item.task.oneTaskType == it.id){
				// 				item.taskName = this.taskEnum[index].name
				// 			}
				// 			if (item.task.twoTaskType != '') {
				// 				it.children.forEach((j, k) => {
				// 					if (item.task.twoTaskType == j.id) {
				// 						item.taskName = j.name
				// 					}
				// 				}) 
				// 			}
				// 		})
				// 	})
				// }
				// setTimeout(() => {
					this.refuseList = [...this.refuseList, ...res.rows]
					
					let obj = {}
					this.refuseList = this.refuseList.reduce((cur,next) => {
					    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
					    return cur;
					},[]) //设置cur默认类型为数组，并且初始值为空的数组
				// }, 1400)
				
				
			},
			
			async getStatus () {
				let res = await this.$fetch(this.$api.list_enum, {}, 'GET', 'FORM')
					
				this.taskEnum = res.data
			},
			successlower () {
				this.mySuccessTask()
			},
			refuselower () {
				this.myRefuseTask()
			},
			goToWorkDetail (id, type) {
				uni.navigateTo({
					url: '../Work/WorkDetail?orderId=' + id + '&type=' + type
				})
			},
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
						word-break : break-all;
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
						width: 50%;
						height: 100%;
						background-image: linear-gradient(90deg, #F7B500 0%, #1DB7BC 100%);
						border-radius: 2px;
						position: absolute;
					}
					.progress-nline{
						width: 100%;
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
				
				}
				.task-tip{
					position: absolute;
					right: 30rpx;
					top: 0;
					width: 108rpx;
					height: 56rpx;
					background: url(../../static/image/9.png) no-repeat;
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
		
			.refuse-item{
				width: 690rpx;
				margin: 0 auto;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				margin-top: 30rpx;
				padding: 30rpx;
				box-sizing: border-box;
				.refuse-header{
					.refuse-header-item{
						display: flex;
						align-items: center;
						&:nth-child(1) {
							padding-bottom: 10rpx;
							box-sizing: border-box;
						}
						&:nth-child(2) {
							padding-bottom: 30rpx;
							box-sizing: border-box;
							border-bottom: 1rpx solid #f2f2f2;
						}
						.refuse-header-item-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
						}
						.refuse-header-item-right{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
				}
				.refuse-center{
					padding-top: 30rpx;
					padding-bottom: 30rpx;
					border-bottom: 1rpx solid #f2f2f2;
					box-sizing: border-box;
					.refuse-center-item{
						display: flex;
						align-items: center;
						&:nth-child(1) {
							padding-bottom: 10rpx;
							box-sizing: border-box;
						}
						.refuse-center-item-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
						}
						.refuse-center-item-right{
							flex: 1;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
							margin-left: 30rpx;
						}
					}
				}
				.refuse-bottom{
					display: flex;
					align-items: center;
					padding-top: 30rpx;
					box-sizing: border-box;
					.refuse-bottom-left{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #A2A2A2;
					}
					.refuse-bottom-right{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
						margin-left: 30rpx;
						box-sizing: border-box;
						
					}
				}
			}
			
		}
		
	}

}
</style>
