<template>
	<view>
		<view class="segmented-control-cls">
			<view class="trapezoid-container-left" v-if="current==0">
				<view class="trapezoid-clip-path-left" @click="tabChange(0)">
					<text class="isSelected">{{items[0]}}</text>
				</view>
				<view class="trapezoid-clip-path-no" @click="tabChange(1)">
					<text>{{items[1]}}</text>
				</view>
			</view>
			<view class="trapezoid-container-right" v-if="current==1">
				<view class="trapezoid-clip-path-right " @click="tabChange(0)">
					<text>{{items[0]}}</text>
				</view>
				<view class="trapezoid-clip-path-no" @click="tabChange(1)">
					<text class="isSelected">{{items[1]}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "chuizi-segmented-control",
		data() {
			return {
				current: 0
			};
		},
		props: {
			items: {
				type: Array,
				default: ['待办', '已办']
			}
		},
		methods: {
			tabChange(type) {
				this.current = type

				this.$emit("controlClick", this.current);
			},
		}
	}
</script>

<style lang="scss">
	.segmented-control-cls {
		margin: 0rpx 25rpx;

		.trapezoid-container-left {
			display: flex;
			align-items: center;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;

			// margin: 20rpx;

			font-size: 30rpx;
			margin-top: 30rpx;
			font-weight: bold;
			text-align: center;
			background-color: #fff;

			/* 如果需要垂直居中（这里可能不需要，因为梯形高度相同） */
			.trapezoid-clip-path-left {
				width: 55%;
				line-height: 35px;
				height: 35px;
				background: linear-gradient(to right, #1296DB, #fff);
				clip-path: polygon(0 0, 85% 0%, 100% 100%, 0% 100%);
				border-top-left-radius: 20rpx;


			}
		}



		.trapezoid-container-right {
			display: flex;
			align-items: center;

			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			font-size: 30rpx;
			margin-top: 30rpx;
			font-weight: bold;
			text-align: center;
			background: linear-gradient(to left, #1296DB, #fff);

			.trapezoid-clip-path-right {
				background-color: #fff;
				width: 55%;
				line-height: 35px;
				height: 35px;
				border-top-left-radius: 20rpx;
				clip-path: polygon(0 0, 85% 0%, 100% 100%, 0% 100%);
			}
		}

		.isSelected {
			border-bottom: 3px solid #fff;
			color: #fff;
			padding-bottom: 5rpx;
		}


		.trapezoid-clip-path-no {
			width: 45%;
			// text-align: center;
			// margin-left: 100rpx;
		}
	}
</style>