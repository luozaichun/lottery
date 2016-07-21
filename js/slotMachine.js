$.fn.slotMachine = function(config){

	var	$slot = $(this), /*当前ul对象*/
	_timer = $slot.timer; /*定时器*/

	var defaults = {
		v1:10, /*初速度*/
		v2:200, /*最大速度*/
		a:2, /*加速度*/
		target:_getRandom(), /*停留目标位置*/
		time:10*600, /*减速到停止所执行的时间 6s*/
		last_time:100, /*最小滚动时间*/
		flag:0 /*当前运动状态 0 加速运动，1 最大速度匀速运动，2 开始减速，3 以最小速度匀速运动并停止到指定块*/
	};
	config = $.extend(defaults, config); /*合并配置*/

	var _v1=config.v1,
	_v2=config.v2,
	_a=config.a,
	_target=config.target,
	_time=config.time;
	_last_time=config.last_time,
	_flag=config.flag,
	_beforeFn=config.beforeFn,
	_afterFn=config.afterFn;

	_init();
	function _init(){
		if(!_check()) return false;
		_before();
		_initDom();
		_stat();
	}
	function _before(){

		/*开始前的回调函数*/
		if(_beforeFn) _beforeFn();

		/*添加当前状态*/
		var status=$slot.attr('data-machine');
		if(status&&status=="running"){
			return false;
		}else if(status&&status=="stoped"){
			var len=$slot.find('li').length/2;
			$slot.find('li:lt('+len+')').remove();
		}
		$slot.attr('data-machine','running');
	}
	function _after(){

		/*添加当前状态*/
		$slot.attr('data-machine','stoped');

		/*执行回调函数*/
		if(_afterFn) _afterFn();
		
	}
	function _stat(){
		

		_timer=setInterval(function () {
			
				var _top=$slot.position().top;	//运动
				$slot.css('top',_top-_v1);
				if(_flag==0){
					_v1+=_a;//加速

				}else if(_flag==1){
					if(_last_time--<=0){
						_flag=2;
					}

				}else if(_flag==2){
					_v1-=_a;
				}else if(_flag==3){
					_stop();
					_getResult();
				}
				
				if(_flag==0&&_v1>=_v2){ //如果速度大于200开始匀速滚动最小时间
					_flag=1;
				}

				if(_flag==2&&_v1<=30){//设置最小速度
					_flag=3;
				}
				
				if(Math.abs(_top)>=$slot.height()/2){ //设置循环，当滚动高度大于一半则重置高度为0
					$slot.css('top',0);
				}
			},60);
	}
	/*数据脏检查*/
	function _check(){

		/*判断指定的目标块是否合理*/
		if(config.target!=null&&config.target>$slot.find('li').length){
			alert('指定奖品无效，请检查target属性！');
			return false;
		}
		return true;
	}
	/*dom初始化*/
	function _initDom(){
		$slot.find('li').each(function(i,v){ /*添加data-index*/
			$(v).attr('data-index',i);
		})
		$slot.append($slot.html());/*复制一份*/
	}

	/*获取当前ul对象随机li*/
	function _getRandom(){
		return Math.floor(Math.random()*($slot.find('li').length));
	}

	/*以最小速度滑动到指定块*/
	function _getResult(){
			var tar_top=$slot.find('li[data-index='+_target+']:eq(1)').position().top;// 到达目标块所需的距离
			$slot.css('top',0);

			if(_time) _stop();
			_timer=setInterval(function(){

				var _top=$slot.position().top;	//运动

				if(Math.abs(Math.abs(_top)-tar_top)<=_v1){
					$slot.css('top',-1*tar_top);
					_stop();
					_after();
				}else{
					$slot.css('top',_top-_v1);
				}

			},60);
		}

		/*停止运动，清空定时器*/
		function _stop(){
			clearInterval(_timer);
			_timer=null;
		}
	}