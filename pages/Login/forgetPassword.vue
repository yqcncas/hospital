<template>
	<view class="forgetPassword">
		<view class="forgetPassword-box">
			<view class="forgetPassword-item">
				<input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="font-size: 14px;color: #969696;">
			</view>
			<view class="forgetPassword-item">
				<input type="number" v-model="yzm" placeholder="请输入验证码" placeholder-style="font-size: 14px;color: #969696;">
				<view class="getQrcode" :class="{timer: computedTimer}" @click="getQrCode">{{getYzm ? '获取验证码' : '重新获取(' + computedTimer + 's)'}}</view>
			</view>
			<view class="forgetPassword-item">
				<input type="password" v-model="password" placeholder="请输入登入密码" placeholder-style="font-size: 14px;color: #969696;">
			</view>
			<view class="forgetPassword-item">
				<input type="password" v-model="passwordagain" placeholder="请重复输入密码" placeholder-style="font-size: 14px;color: #969696;">
			</view>
		</view>
		<view class="submit-button" role = "button" @click="login">确认</view>
		
			
		
	</view>
</template>

<script>
	import jsencrypt from '@/js_sdk/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	export default {
		data () {
			return {
				computedTimer: 0,
				getYzm: true,
				phone: '',
				yzm: '',
				password: '',
				passwordagain: ''
			}
		},
		methods: {
			async getQrCode () {
				if (!this.$u.test.mobile(this.phone)) return uni.showToast({icon: 'none', title: '手机号输入有误'})
				if (!this.getYzm) return
				this.getYzm = false
				this.computedTimer = 60
				const timer = setInterval(() => { 
					if (this.computedTimer <= 0) {
						clearInterval(timer)
						this.getYzm = true
					} else {
						this.computedTimer--
					}
				}, 1000)
				var pubblicData = jsencrypt.setEncrypt(this.$api.publiukey, this.phone);

				let res = await this.$fetch(this.$api.verification_code, {mobile: pubblicData}, "POST", 'JSON')
				console.log(res)
			},
			async login () {
			  if (!this.$u.test.mobile(this.phone)) return uni.showToast({icon: 'none', title: '手机号输入有误'})
			  if (this.yzm.trim() == '') return uni.showToast({icon: 'none', title: '请输入验证码'})
			  if (this.password.trim() == '') return uni.showToast({icon: 'none', title: '请输入密码'})
			  if (this.passwordagain.trim() == '') return uni.showToast({icon: 'none', title: '请输入确认密码'})
			  if (this.passwordagain.trim() != this.password.trim()) return uni.showToast({icon: 'none', title: '两次输入的密码不一致'})
			 
			  
			  let res = await this.$fetch(this.$api.upd_pwd, {mobile: this.phone, checkCode: this.yzm, newPwd: this.password}, "Put", 'form')
			  console.log(res)
			  uni.showToast({
			  	icon: 'none',
				title: res.msg
			  })
			  
			  if (res.code == 200) {
				  uni.reLaunch({
				  	url: './Login'
				  })
			  }
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.forgetPassword{
		.forgetPassword-box{
			padding-left: 30rpx;
			background-color: #fff;
			.forgetPassword-item{
				width: 100%;
				height: 110rpx;
				display: flex;
				align-items: center;
				
				border-bottom: 1rpx solid #f2f2f2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&:nth-last-child(1){
					border-bottom: 0;
				}
				input{
					font-size: 16px;
				}
				.getQrcode{
					height: 110rpx;
					line-height: 110rpx;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #4A90E2;
					letter-spacing: 0;
					padding-right: 30rpx;
					&.timer{
						color: #c8c9cc;
					}
				}
			}
		}
		.submit-button{
			width: 690rpx;
			height: 100rpx;
			background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
			border-radius: 5px;
			box-sizing: border-box;
			line-height: 100rpx;
			text-align: center;
			font-family: PingFangSC-Semibold;
			font-size: 17px;
			color: #FFFFFF;
			margin: 0 auto;
			margin-top: 150rpx;
			
			letter-spacing: 0;
		}
	}
</style>
