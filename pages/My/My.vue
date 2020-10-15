<template>
	<view class="my">
		<view class="my-header">
			<view class="my-header-box">
				<view class="my-header-top">
					<view class="my-header-top-text">我的</view>
					<image src="../../static/image/4.png" mode="aspectFill" @click="goMyInfo"></image>
				</view>
				<view class="my-header-avatar-box" >
					<image :src="userInfo.avatar ? userInfo.avatar : '../../static/image/avatar.png'" mode="aspectFill"></image>
				</view>
				<view class="user-name-box">
					<view class="user-name">{{userInfo.nickName ? userInfo.nickName : '未登录'}}</view>
					<view class="user-info">
						<view class="user-info-item" @click="goMyTask">
							<view class="user-info-item-top">{{userInfo.taskCount ? userInfo.taskCount : 0}}</view>
							<view class="user-info-item-bottom">我的任务</view>
						</view>
						<view class="line"></view>
						<view class="user-info-item" @click="goToMyIntegral">
							<view class="user-info-item-top">{{userInfo.integral ? userInfo.integral : 0}}</view>
							<view class="user-info-item-bottom">我的积分</view>
						</view>
						<view class="line"></view>
						<view class="user-info-item" @click="goToMyRank(userInfo.avatar, userInfo.nickName, userInfo.integral, userInfo.rank)">
							<view class="user-info-item-top">{{userInfo.rank? userInfo.rank : '暂无'}}</view>
							<view class="user-info-item-bottom">我的排名</view>
						</view>
	
					</view>
					<view class="user-about">
						<view class="user-about-item" @click="goToMyRate">
							<view class="user-about-item-left">
								<image src="../../static/image/6.png" mode="aspectFill" ></image>
							</view>
								
							<view class="user-about-item-right">
								<view class="user-about-item-left-text">我的评价</view>
								<image src="../../static/image/2.png" mode="aspectFill" ></image>
							</view>
							
						</view>
						<view class="user-about-item">
							<view class="user-about-item-left">
								<image src="../../static/image/7.png" mode="aspectFill" ></image>
							</view>
								
							<view class="user-about-item-right">
								<view class="user-about-item-left-text">关于我们</view>
								<image src="../../static/image/2.png" mode="aspectFill" ></image>
							</view>
							
						</view>
						<view class="user-about-item" @click="APPCheck">
							<view class="user-about-item-left">
								<image src="../../static/image/7.png" mode="aspectFill" ></image>
							</view>
								
							<view class="user-about-item-right">
								<view class="user-about-item-left-text">检查更新</view>
								<view class="user-about-item-left-text-right-box">
									<view class="user-about-item-version">{{version}}</view>
									<image src="../../static/image/2.png" mode="aspectFill" ></image>
								</view>
							</view>
							
						</view>
						<view class="user-about-item">
							<view class="user-about-item-left">
								<image src="../../static/image/8.png" mode="aspectFill" ></image>
							</view>
								
							<view class="user-about-item-right" @click="clear">
								<view class="user-about-item-left-text">清除缓存</view>
								<image src="../../static/image/2.png" mode="aspectFill" ></image>
							</view>
							
						</view>
						<view class="user-about-item">
							<view class="user-about-item-left">
								<image src="../../static/image/17.png" mode="aspectFill" ></image>
							</view>
								
							<view class="user-about-item-right" >
								<view class="user-about-item-left-text">上班状态</view>
								<!-- <image src="../../static/image/2.png" mode="aspectFill" ></image> -->
								<view class="user-status">
									<text>{{switchFlag ? '上班' : '离线'}}</text>
									<switch :checked = "switchFlag" @change="switchChange" color="#1DB7BC"/>
								</view>
							</view>
							
						</view>
					</view>
					<view class="exit" @click="exit">退出登录</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
// #ifdef APP-PLUS
	import APPUpdate from "@/js_sdk/zhouWei-APPUpdate/APPUpdate";
	// #endif
	export default {
		onShow() {
			this.version = plus.runtime.version
			this.getMyInfo()
		},
		data () {
			return {
				userInfo: {},
				switchFlag: false,
				version: '1.0.0'
			}
		},
		methods:{
			APPCheck() {
				 // #ifdef APP-PLUS
				    APPUpdate();
				    // #endif
			},
			async switchChange () {
				this.switchFlag = !this.switchFlag
				let status = this.switchFlag ? 1 : 0
				let res = await this.$fetch(this.$api.changeJobStatus, {jobStatus: status}, "PUT", 'FORM')
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
				
			},
			// 个人信息
			async getMyInfo () {
				let res = await this.$fetch(this.$api.get_user_detail, {}, "GET", 'FORM')
				console.log(res)
				this.userInfo = res.data 
				if (this.userInfo.avatar && this.userInfo.avatar.indexOf('bajiao') == -1) {
					this.userInfo.avatar = baseURL.slice(0, baseURL.length - 1) + this.userInfo.avatar
					console.log(this.userAvatar)
				} else {
					this.userInfo.avatar = this.userInfo.avatar
				}
				if (this.userInfo.jobStatus == 2 || this.userInfo.jobStatus == 1) {
					this.switchFlag = true
				} else {
					this.switchFlag = false
				}
				console.log(this.userInfo.avatar)
			},
			// 评价
			goToMyRate() {
				uni.navigateTo({
					url: './MyStar'
				})
			},
			// 个人信息
			goMyInfo () {
				uni.navigateTo({
					url: './MyInfo'
				})
			},
			// 积分
			goToMyIntegral() {
				uni.navigateTo({
					url: './MyIntegral'
				})
			},
			// 排行
			goToMyRank(avatar, name, integral, rank) {
				if (rank == null) {
					rank = '暂无'
				}
				if (avatar == '') {
					avatar = '../../static/image/avatar.png'
				}
				uni.navigateTo({
					url: './MyRank?avatar=' + avatar + '&name=' + name + '&integral=' + integral + '&rank=' + rank
				})
			},
			goMyTask () {
				uni.navigateTo({
					url: './MyTask'
				})
			},
			exit () {
				uni.showModal({
				    title: '提示',
				    content: '是否确定退出',
				    success: async(res) => {
				        if (res.confirm) {
							let msg = await this.$fetch(this.$api.changeJobStatus, {jobStatus: 0}, "PUT", 'FORM')
							uni.removeStorageSync('token')
				            uni.reLaunch({
				            	url: '../Login/Login'
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			},
			// 清除缓存
			clear () {
				uni.showModal({
				    title: '提示',
				    content: '是否清除缓存',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});

			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.my{
		.my-header{
			width: 100%;
			height: 520rpx;
			background: url(../../static/image/1.png) no-repeat;
			background-size: 100% 100%;
			.my-header-box{
				padding-top: var(--status-bar-height);
				
				.my-header-top{
					display: flex;
					justify-content: center;
					align-items: center;
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					text-align: center;
					line-height: 32px;
					image{
						width: 36rpx;
						height: 36rpx;
						// transform: translate(272rpx, 4rpx);
						position: absolute;
						right: 60rpx;
					}
				}
				.my-header-avatar-box{
					width: 166rpx;
					height: 166rpx;
					background: rgba(255,255,255,0.40);
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					margin: 0 auto;
					margin-top: 40rpx;
					margin-bottom: 20rpx;
					box-sizing: border-box;
					image{
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
					}
				}
				.user-name-box{
					.user-name{
						font-family: PingFangSC-Medium;
						font-size: 17px;
						color: #FFFFFF;
						text-align: center;
					}
					.user-info{
						width: 690rpx;
						height: 184rpx;
						background: #FFFFFF;
						box-shadow: 0 2px 7px 0 rgba(0,0,0,0.07);
						border-radius: 7px;
						box-sizing: border-box;
						margin: 0 auto;
						margin-top: 40rpx;
						display: flex;
						align-items: center;
						.user-info-item{
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							flex: 1;
							.user-info-item-top{
								font-family: PingFangSC-Semibold;
								font-size: 22px;
								color: #1DB7BC;
								text-align: center;
							}
							.user-info-item-bottom{
								font-family: PingFangSC-Regular;
								font-size: 12px;
								color: rgba(0,0,0,0.85);
								text-align: center;
								margin-top: 10rpx;
								box-sizing: border-box;
							}
						}
						.line{
							width: 2rpx;
							height: 60rpx;
							background: #F2F2F2;
							border-radius: 0.5px;
							overflow: hidden;
						}
					}
					.user-about{
						margin-top: 40rpx;
						// padding-left: 36rpx;
						// padding-right: 30rpx;
						box-sizing: border-box;
						background-color: #fff;
						.user-about-item{
							height: 100rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.user-about-item-left{
								width: 110rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								image{
									width: 50rpx;
									height: 50rpx;
								}
							}
							
							.user-about-item-right{
								flex: 1;
								height: 100%;
								display: flex;
								justify-content: space-between;
								align-items: center;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: rgba(0,0,0,0.85);
								border-bottom: 1rpx solid #f2f2f2;
								image{
									width: 16rpx;
									height: 26rpx;
									margin-right: 30rpx;
									box-sizing: border-box;
								}
								.user-status{
									text{
										font-family: PingFangSC-Regular;
										font-size: 14px;
										color: #333155;
										letter-spacing: 0.17px;
										margin-right: 30rpx;
									}
								}
								.user-about-item-left-text-right-box{
									display: flex;
									align-items: center;
									.user-about-item-version{
										margin-right: 30rpx;
										font-size: 14px;
										color: #82848a;
									}
								}
							}
						}
					}
					.exit{
						margin-top: 40rpx;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #E02020;
						text-align: center;
						height: 100rpx;
						line-height: 100rpx;
						background-color: #fff;
					}
				}
			}
		}
	}
</style>
