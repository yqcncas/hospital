<template>
	<view class="refuseWork">
		<view class="refuseWork-box">
			<textarea v-model="refuseRemark" placeholder="请输入您拒单任务的原因" placeholder-style="font-family: PingFangSC-Regular;font-size: 14px;color: #A2A2A2;" />
		</view>
		<view class="submit-button" role ="button" @click="refuseTask">提交</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.orderId = options.orderId
		},
		data () {
			return {
				refuseRemark: '',
				orderId: ''
			}
		},
		methods: {
			async refuseTask () {
				if (this.refuseRemark.trim() == '') return uni.showToast({
					icon: 'none',
					title: '请填写拒单原因'
				})
				let res = await this.$fetch(this.$api.refuse, {orderId: this.orderId, remark: this.refuseRemark}, 'PUT', 'FORM')
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
				if (res.code == 200) {
					uni.setStorageSync('refushFlag', true)
					// uni.navigateBack({
					// 	delta: 1
					// })
					uni.switchTab({
						url: '../index/index'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		height: 100%;
	}
	.refuseWork{
		width: 100%;
		height: 100%;
		background-color: rgb(247,247,250);
		.refuseWork-box{
			width: 100%;
			height: 800rpx;
			background-color: #fff;
			padding: 30rpx;
			box-sizing: border-box;
		}
		.submit-button{
			width: 100%;
			position: fixed;
			bottom: 0;
			height: 100rpx;
			line-height: 100rpx;
			font-family: PingFangSC-Semibold;
			font-size: 17px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
		}
	}
</style>
