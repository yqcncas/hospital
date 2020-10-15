<template>
	<view class="inform">
		<mescroll-body ref="mescrollRef"  @down="downCallback" :up="upOption">
			<view class="inform-box">
				<view class="inform-item" v-for="(item, index) in informList" :key = "index">
					<view class="inform-item-top">
						<view class="inform-item-top-left">{{item.title}}</view>
						<view class="inform-item-top-right">{{item.createTime}}</view>
					</view>
					<view class="inform-item-center" v-if="item.taskNo">您有新的任务编号 <text>{{item.taskNo}} </text> ，请接单。</view>
					<view class="inform-item-center" v-else>{{item.content}}</view>
				</view>
				
			</view>
			<uniLoadMore bgColor="rgba(247, 247, 250)" :status="hasFlag ? 'loading' : 'noMore'"></uniLoadMore>
		</mescroll-body>
		<u-empty mode="list" v-if = "showListFlag"></u-empty>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data () {
			return {
				hasFlag: true,
				upOption: {
					use: false
				},
				pageNum: 0,
				pageSize: 10,
				showListFlag: false,
				informList: []
			}
		},
		onReachBottom() {
			this.initInfoList()
		},
		methods: {
			async initInfoList () {
				if (!this.hasFlag) return
				++this.pageNum
				let res = await this.$fetch(this.$api.tasklist_client, {pageNum: this.pageNum, pageSize: this.pageSize}, "GET", 'FORM')
				console.log(res)
				if (!res.total) {
					this.showListFlag = true
				} else {
					this.showListFlag = false
				}
				this.informList = [...this.informList, ...res.rows]
				this.hasFlag = this.pageNum * this.pageSize < res.total
			},
			
			downCallback () {
				this.hasFlag = true
				this.pageNum = 0
				this.showListFlag = true
				this.informList = []
				this.initInfoList()
				this.mescroll.endDownScroll()
			}
			
		}
		
	}
</script>

<style lang="less">
	page{
		width: 100%;
		background: rgb(247,247,250);
	}
	.inform{
		.inform-box{
			.inform-item{
				width: 690rpx;
				margin: 0 auto;
				margin-top: 30rpx;
				background-color: #fff;
				padding: 30rpx;
				box-sizing: border-box;
				background: #FFFFFF;
				box-shadow: 0 4px 8px 0 rgba(140,92,42,0.03), 0 2px 4px 0 rgba(140,92,42,0.01);
				border-radius: 7px;
				.inform-item-top{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 30rpx;
					box-sizing: border-box;
					.inform-item-top-left{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: rgba(0,0,0,0.85);
						font-weight: bold;
					}
					.inform-item-top-right{
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #A2A2A2;
					}
				}
				.inform-item-center{
					width: 630rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: rgba(49,49,49,0.85);
					text{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #1db7bc;
						line-height: 20px;
					}
				}
				
			}
		}
	}
</style>
