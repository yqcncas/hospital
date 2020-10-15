<template>
	<view class="myinfo">
		<view class="myinfo-box">
			<view class="myinfo-box-avatar-box" @click="handleUserAvatar">
				<image :src="userAvatar ? userAvatar : '../../static/image/avatar.png'" mode="aspectFill"></image>
				<view class="myinfo-box-avatar-box-right">
					修改头像
					<image src="../../static/image/2.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="myinfo-box-item">
				<view class="myinfo-box-item-left">昵称</view>
				<input type="text"  v-model="userName"  @blur="handleUserInfoName"/>
			</view>
			<picker mode="date" @change="selectedDate">
			<view class="myinfo-box-item">
				
				<view class="myinfo-box-item-left">生日</view>
				<view class="birthday-box">
					<input type="text" v-model="birthDay" placeholder="请选择" placeholder-style="font-size: 14px;color: #A2A2A2;" disabled/>
					<image src="../../static/image/2.png" mode="aspectFill"></image>
				</view>
				
			</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import baseURL from '../../config/index.js'
	export default {
		onLoad() {
			this.getMyInfo()
			this.getQNToken()
		},
		data () {
			return {
				userName: '瓯睿物业',
				userAvatar: '',
				birthDay: '',
				userInfo: {},
				qnToken: ''
			}
		},
		methods: {
			// 获取七牛token
			async getQNToken () {
				let res = await this.$fetch(this.$api.get_qiniu_token, {}, "GET", "FORM")
				console.log(res)
				this.qnToken = res.msg
			},
			// 修改生日
			async selectedDate (e) {
				console.log(e)
				this.birthDay = e.detail.value
				this.userInfo.birthday = e.detail.value
				let res = await this.$fetch(this.$api.upd_user_info, this.userInfo, "PUT")
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
			},
			// 修改姓名
			async handleUserInfoName () {
				this.userInfo.nickName = this.userName
				let res = await this.$fetch(this.$api.upd_user_info, this.userInfo, "PUT")
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
			},
			// 修改头像
			handleUserAvatar () {
				// this.userAvatar = 
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: this.$api.unloadLocation, //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'token': this.qnToken
				            },
				            success: async ({data}) => {
				                data = JSON.parse(data)
								console.log(this.$api.baseLocation + data.hash)
								this.userAvatar = this.$api.baseLocation + data.hash
								this.userInfo.avatar = this.$api.baseLocation + data.hash
								let res = await this.$fetch(this.$api.upd_user_info, this.userInfo, "PUT")
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
				            }
				        });
				    }
				});
			},
			// 个人信息
			async getMyInfo () {
				let res = await this.$fetch(this.$api.get_user_detail, {}, "GET", 'FORM')
				this.userInfo = res.data
				this.userName = this.userInfo.nickName
				this.birthDay  = this.userInfo.birthday

				if (this.userInfo.avatar && this.userInfo.avatar.indexOf('bajiao') == -1) {
					this.userAvatar = baseURL.slice(0, baseURL.length - 1) + this.userInfo.avatar
				} else {
					this.userAvatar = this.userInfo.avatar
				}
			},
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.myinfo{
		.myinfo-box{
			padding: 30rpx;
			padding-bottom: 0;
			margin-top: 30rpx;
			background-color: #fff;
			.myinfo-box-avatar-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f2f2f2;
				image{
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}
				.myinfo-box-avatar-box-right{
					display: flex;
					align-items: center;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #A2A2A2;
					letter-spacing: -0.34px;
					text-align: justify;
					
					image{
						width: 16rpx;
						height: 26rpx;
						margin-left: 20rpx;
					}
				}
			}
			.myinfo-box-item{
				width: 100%;
				height: 100rpx;
				border-bottom: 1rpx solid #f2f2f2;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:nth-last-child(1){
					border-bottom: 0;
				}
				.myinfo-box-item-left{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.85);
				}
				input{
					text-align: right;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(0,0,0,0.85);
				}
				.birthday-box{
					display: flex;
					align-items: center;
					image{
						width: 16rpx;
						height: 26rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
