<template>
	<view class="myrank">
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
			<view class="myrank-header">
				<view class="myrank-header-top">
					<image src="../../static/image/16.png" mode="aspectFill" @click="goBack"></image>
					<view class="myrank-header-top-text">我的排名</view>
				</view>
				<view class="myrank-header-center">
					<view class="myrank-header-center-avatar">
						<image :src="myInfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="myrank-header-center-right">
						<view>{{myInfo.name}}</view>
						<view v-if="myInfo.rank == '暂无'"><text>排名</text>{{myInfo.rank}}</view>
						<view v-else><text>排名</text>No.{{myInfo.rank}}</view>
						<view><text>积分</text>{{myInfo.integral}}</view>
					</view>
				</view>
			</view>
			<view class="myrank-main" v-if="!showListFlag">
				<view class="myrank-main-item" v-for="(item, index) in rankList" :key = "index" >
					<view class="myrank-main-item-left">
						<view class="myrank-main-item-left-tank" v-if="index == 0">
							<image src="../../static/image/14.png" mode="aspectFill"></image>
						</view>
						<view class="myrank-main-item-left-tank" v-if="index == 1">
							<image src="../../static/image/15.png" mode="aspectFill"></image>
						</view>
						<view class="myrank-main-item-left-tank" v-if="index > 1">{{index + 1}}</view>
						<image :src="item.avatar ? item.avatar : '../../static/image/avatar.png' " mode="aspectFill" class="myrank-main-item-left-avatar"></image>
						<view class="user-name">{{item.nickName}}</view>
					</view>
					<view class="myrank-main-item-right">
						<view class="myrank-main-item-right-box">
							<image src="../../static/image/5.png" mode="aspectFill"></image>
							<view class="myrank-main-item-right-fenshu">{{item.integral}}</view>
						</view>
					</view>
				</view>
				<uniLoadMore bgColor="rgba(255,255,255)" :status="hasFlag ? 'loading' : 'noMore'"></uniLoadMore>
			</view>
		</mescroll-body>
		<u-empty mode="list" v-if = "showListFlag"></u-empty>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		onLoad(options) {
			this.myInfo.avatar = options.avatar
			this.myInfo.name = options.name
			this.myInfo.integral = options.integral
			this.myInfo.rank = options.rank
			// this.initRankList()
		},
		data () {
			return {
				myInfo: {
					avatar: '',
					name: '',
					integral: '',
					rank: ''
				},
				hasFlag: false,
				rankList: [],
				showListFlag: false,
				upOption: {
					use: false
				}
			}
		},
		methods: {
			goBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			// 积分排名
			async initRankList () {
				let res = await this.$fetch(this.$api.integral_list, {}, "GET", 'FORM')
				if (res.data.length == 0) {
					this.showListFlag = true
				} else {
					this.showListFlag = false
				}
				this.rankList = res.data
				console.log(res)
			},
			downCallback () {
				this.hasFlag = false
				this.showListFlag = false
				this.rankList = []
				this.initRankList()
				this.mescroll.endDownScroll()
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.myrank{
		.myrank-header{
			width: 100%;
			background-image: linear-gradient(180deg, #3EDCDF 0%, #1DB7BC 100%);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			position: fixed;
			z-index: 99;
			// top: var(--status-bar-height);
			.myrank-header-top{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: var(--status-bar-height);
				image{
					width: 24rpx;
					height: 42rpx;
					position: absolute;
					left: 30rpx;
				}
				.myrank-header-top-text{
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					text-align: center;
					line-height: 32px;
				}
			}
			.myrank-header-center{
				display: flex;
				align-items: center;
				justify-content: center;
				padding-top: 60rpx;
				padding-bottom: 60rpx;
				box-sizing: border-box;
				.myrank-header-center-avatar{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					background: rgba(255,255,255,0.40);
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					margin-right: 30rpx;
					image{
						width: 135.6rpx;
						height: 135.6rpx;
						border-radius: 50%;
						box-sizing: border-box;
					}
				}
				.myrank-header-center-right{
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #FFFFFF;
					text{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(255,255,255,0.80);
						padding-right: 30rpx;
					}
					view{
						padding-bottom: 10rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.myrank-main{
			padding-top: 376rpx;
			box-sizing: border-box;
			background-color: #fff;
			.myrank-main-item{
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #f2f2f2;
				box-sizing: border-box;
				background-color: #fff;
				.myrank-main-item-left{
					display: flex;
					align-items: center;
					.myrank-main-item-left-tank{
						width: 114rpx;
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #1DB7BC;
						text-align: center;
						display: flex;
						align-items: center;
						justify-content: center;
						image{
							width: 54rpx;
							height: 64rpx;
						}
					}
					.myrank-main-item-left-avatar{
						width: 70rpx;
						height: 70rpx;
						border-radius: 50%;
						box-sizing: border-box;
					}
					.user-name{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
						padding-left: 20rpx;
						box-sizing: border-box;
					}
				}
				.myrank-main-item-right{
					width: 140rpx;
					display: inline-block;
					.myrank-main-item-right-box{
						display: flex;
						align-items: center;
						justify-content: space-around;
					}
					image{
						width: 26rpx;
						height: 24rpx;
					}
					.myrank-main-item-right-fenshu{
						flex: 1;
						font-family: PingFangSC-Medium;
						font-size: 14px;
						color: #1DB7BC;
						text-align: center;
						// padding-right: 30rpx;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>
