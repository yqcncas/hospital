<template>
	<view class="myIntegral">
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
		<view class="myIntegral-box">
			<view class="myIntegral-item" v-for="(item, index ) in MyIntergralList" :key = "index">
				<view class="myIntegral-item-left">
					<view class="myIntegral-item-left-top">
						<view class="myIntegral-item-left-top-item">
							<view class="myIntegral-item-left-top-item-left">任务编号</view>
							<view class="myIntegral-item-left-top-item-right">{{item.taskNo}}</view>
						</view>
						<view class="myIntegral-item-left-top-item">
							<view class="myIntegral-item-left-top-item-left">完成时间</view>
							<view class="myIntegral-item-left-top-item-right">{{item.createTime}}</view>
						</view>
					</view>
					
				</view>
				<view class="myIntegral-item-left-right">+{{item.optIntegral}}</view>
			</view>
			<uniLoadMore bgColor="rgba(247, 247, 250)" :status="hasFlag ? 'loading' : 'noMore'"></uniLoadMore>
		</view>
		</mescroll-body>
		<u-empty mode="list" v-if = "showListFlag"></u-empty>
		
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		onLoad() {
			// this.initMyIntergral()
		},
		data () {
			return {
				MyIntergralList: [],
				hasFlag: true,
				pageSize: 10,
				pageNum: 0,
				showListFlag: false,
				upOption: {
					use: false
				}
			}
		},
		methods: {
			async initMyIntergral () {
				if (!this.hasFlag) return
				++this.pageNum
				let res = await this.$fetch(this.$api.clien_list, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", 'FORM')
				console.log(res)
				this.MyIntergralList = [...this.MyIntergralList, ...res.rows]
				if (res.total == 0) {
					this.showListFlag = true
				} else {
					this.showListFlag = false
				}
				this.hasFlag = this.pageNum * this.pageSize < res.total
			},
			downCallback () {
				this.hasFlag = true
				this.pageNum = 0
				this.showListFlag = false
				this.MyIntergralList = []
				this.initMyIntergral()
				this.mescroll.endDownScroll()
			}
		},
		onReachBottom() {
			console.log('1111')
			this.initMyIntergral()
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.myIntegral{
		.myIntegral-box{
			margin-top: 30rpx;
			box-sizing: border-box;
			.myIntegral-item{
				width: 100%;
				height: 130rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #f2f2f2;
				&:nth-last-child(1) {
					border-bottom: 0;
				}
				.myIntegral-item-left-top{
					
					.myIntegral-item-left-top-item{
						display: flex;
						align-items: center;
						&:nth-child(2){
							padding-top: 20rpx;
						}
						.myIntegral-item-left-top-item-left{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: #A2A2A2;
							letter-spacing: 0;
						}
						.myIntegral-item-left-top-item-right{
							font-family: PingFangSC-Regular;
							font-size: 12px;
							color: rgba(0,0,0,0.85);
							letter-spacing: 0;
							margin-left: 30rpx;
						}
					}
				}
				.myIntegral-item-left-right{
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #1DB7BC;
					letter-spacing: 0;
					text-align: center;
				}
			}
		}
	}
</style>
