<template>
	<view class="mystar">
		<view class="mystar-box">
			<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
				<view class="mystar-item" v-for="(item, index) in myStarList" :key = "index">
					<view class="mystar-item-header">
						<view class="mystar-item-header-top">
							<view class="mystar-item-header-top-left">任务编号</view>
							<view class="mystar-item-header-top-right">{{item.taskNo}}</view>
						</view>
						<view class="mystar-item-header-top">
							<view class="mystar-item-header-top-left">完成时间</view>
							<view class="mystar-item-header-top-right">{{item.createTime}}</view>
						</view>
					</view>
					<view class="mystar-item-center">
						<view class="mystar-item-center-top">
							<view class="mystar-item-center-top-left">服务满意度</view>
							<view class="mystar-item-center-top-star">
								<image src="../../static/image/11.png" mode="aspectFill" v-for="(item, index ) in item.score" :key = "index"></image>
								<image src="../../static/image/12.png" mode="aspectFill" v-for="(item, index) in noStar" :key = "index"></image>
							</view>
						</view>
						<view class="mystar-item-center-bottom">{{item.content}}</view>
					</view>
				</view>
				<uniLoadMore bgColor="rgba(255,255,255)" :status="hasFlag ? 'loading' : 'noMore'"></uniLoadMore>
			</mescroll-body>
			<u-empty mode="list" v-if = "showListFlag"></u-empty>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		onLoad() {
			// this.initMyStar()
		},
		onReachBottom() {
			this.initMyStar()
		},
		data () {
			return {
				upOption: {
					use: false
				},
				pageNum: 0,
				pageSize: 10,
				hasFlag: true,
				showListFlag: false,
				myStarList: []
			}
		},
		methods: {
			downCallback () {
				this.hasFlag = true
				this.pageNum = 0
				this.showListFlag = false
				this.myStarList = []
				this.initMyStar()
				this.mescroll.endDownScroll()
			},
			async initMyStar () {
				if (!this.hasFlag) return
				++this.pageNum
				let res = await this.$fetch(this.$api.list_client, {pageNum: this.pageNum, pageSize: 10}, 'GET', 'FORM')
				console.log(res)
				this.myStarList = [...this.myStarList, ...res.rows]
				let obj = {};
				// 要去重的数组
				this.myStarList = this.myStarList.reduce((cur,next) => {
				    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
				    return cur;
				},[]) //设置cur默认类型为数组，并且初始值为空的数组
				this.myStarList.forEach(item => {
					item.noStar = 5 - item.score
				})

				this.hasFlag = this.pageNum * this.pageSize < res.total
			}
		}
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background-color: rgb(247,247,250);
	}
	.mystar{
		.mystar-box{
			// padding-top: 30rpx;
			padding-bottom: 30rpx;
			.mystar-item{
				width: 690rpx;
				margin: 0 auto;
				padding: 30rpx;
				margin-top: 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				.mystar-item-header{
					padding-bottom: 30rpx;
					border-bottom: 1rpx solid #f2f2f2;
					.mystar-item-header-top{
						display: flex;
						align-items: center;
						&:nth-child(1){
							padding-bottom: 10rpx;
						}
						.mystar-item-header-top-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
						}
						.mystar-item-header-top-right{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: rgba(0,0,0,0.85);
							margin-left: 30rpx;
							box-sizing: border-box;
						}
					}
				}
				.mystar-item-center{
					background: #F7F7FA;
					border-radius: 2px;
					padding: 30rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					.mystar-item-center-top{
						display: flex;
						align-items: center;
						.mystar-item-center-top-left{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #A2A2A2;
							margin-right: 30rpx;
						}
						.mystar-item-center-top-star{
							display: flex;
							align-items: center;
							image{
								width: 44rpx;
								height: 44rpx;
								margin-right: 20rpx;
							}
						}
					}
					.mystar-item-center-bottom{
						padding-top: 32rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: rgba(0,0,0,0.85);
					}
				}
			}
		}
	}
</style>
