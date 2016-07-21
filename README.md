# lottery
> 滚动抽奖，可设置速度，停留目标位置等参数 

### 添加jquery库和slotMachine.js
``` html
<script type="text/javascript" src="js/jquery-1.7.2-min.js"></script>
<script type="text/javascript" src="js/slotMachine.js"></script>
```
### 可以设置需要的参数
``` js
$(obj).slotMachine({
    beforeFn:function(){},  /*开始前的回调函数*/
		v1:10,  /*初速度*/
		v2:200,  /*最大速度*/
		a:2,  /*加速度*/
		target:_getRandom(),  /*停留目标位置*/
		time:10*600,  /*减速到停止所执行的时间 6s*/
		last_time:100,  /*最小滚动时间*/
		flag:0   /*当前运动状态 0 加速运动，1 最大速度匀速运动，2 开始减速，3 以最小速度匀速运动并停止到指定块*/
		afterFn:function(){},  /*结束后的回调函数*/
	});
	
```
