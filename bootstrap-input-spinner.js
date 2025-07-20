(function($){"use strict"
var spacePressed=!1
var originalVal=$.fn.val
$.fn.val=function(value){if(arguments.length>=1){if(this[0]&&this[0]["bootstrap-input-spinner"]&&this[0].setValue){this[0].setValue(value)}}
return originalVal.apply(this,arguments)}
$.fn.InputSpinner=$.fn.inputSpinner=function(options){var config={decrementButton:"<i class='fas fa-minus'></i>",incrementButton:"<i class='fas fa-plus'></i>",groupClass:"",buttonsClass:"btn-outline-secondary",buttonsWidth:"1rem",textAlign:"center",autoDelay:500,autoInterval:100,boostThreshold:10,boostMultiplier:"auto",locale:null}
for(var option in options){config[option]=options[option]}
var html='<div class="input-group '+config.groupClass+'">'+'<div class="input-group-prepend">'+'<button style="min-width: '+config.buttonsWidth+'" class="btn btn-decrement '+config.buttonsClass+'" type="button">'+config.decrementButton+'</button>'+'</div>'+'<input type="text" style="text-align: '+config.textAlign+'" class="form-control"/>'+'<div class="input-group-append">'+'<button style="min-width: '+config.buttonsWidth+'" class="btn btn-increment '+config.buttonsClass+'" type="button">'+config.incrementButton+'</button>'+'</div>'+'</div>'
var locale=config.locale||navigator.language||"en-US"
this.each(function(){var $original=$(this)
$original[0]["bootstrap-input-spinner"]=!0
$original.hide()
var autoDelayHandler=null
var autoIntervalHandler=null
var autoMultiplier=config.boostMultiplier==="auto"
var boostMultiplier=autoMultiplier?1:config.boostMultiplier
var $inputGroup=$(html)
var $buttonDecrement=$inputGroup.find(".btn-decrement")
var $buttonIncrement=$inputGroup.find(".btn-increment")
var $input=$inputGroup.find("input")
var min=null
var max=null
var step=null
var stepMax=null
var decimals=null
updateAttributes()
var numberFormat=new Intl.NumberFormat(locale,{minimumFractionDigits:decimals,maximumFractionDigits:decimals})
var value=parseFloat($original[0].value)
var boostStepsCount=0
var prefix=$original.attr("data-prefix")||""
var suffix=$original.attr("data-suffix")||""
if(prefix){var prefixElement=$('<span class="input-group-text">'+prefix+'</span>')
$inputGroup.find(".input-group-prepend").append(prefixElement)}
if(suffix){var suffixElement=$('<span class="input-group-text">'+suffix+'</span>')
$inputGroup.find(".input-group-append").prepend(suffixElement)}
$original[0].setValue=function(newValue){setValue(newValue)}
var observer=new MutationObserver(function(){updateAttributes()
setValue(value,!0)})
observer.observe($original[0],{attributes:!0})
$original.after($inputGroup)
setValue(value)
$input.on("paste input change focusout",function(event){var newValue=$input[0].value
var focusOut=event.type==="focusout"
if(!(locale==="en-US"||locale==="en-GB"||locale==="th-TH")){newValue=newValue.replace(/[. ]/g,'').replace(/,/g,'.')}
setValue(newValue,focusOut)
dispatchEvent($original,event.type)})
onPointerDown($buttonDecrement[0],function(){stepHandling(-step)})
onPointerDown($buttonIncrement[0],function(){stepHandling(step)})
onPointerUp(document.body,function(){resetTimer()})
function setValue(newValue,updateInput){if(updateInput===undefined){updateInput=!0}
if(isNaN(newValue)||newValue===""){$original[0].value=""
if(updateInput){$input[0].value=""}
value=0}else{newValue=parseFloat(newValue)
newValue=Math.min(Math.max(newValue,min),max)
newValue=Math.round(newValue*Math.pow(10,decimals))/Math.pow(10,decimals)
$original[0].value=newValue
if(updateInput){$input[0].value=numberFormat.format(newValue)}
value=newValue}}
function dispatchEvent($element,type){if(type){setTimeout(function(){var event
if(typeof(Event)==='function'){event=new Event(type,{bubbles:!0})}else{event=document.createEvent('Event')
event.initEvent(type,!0,!0)}
$element[0].dispatchEvent(event)})}}
function stepHandling(step){if(!$input[0].disabled){calcStep(step)
resetTimer()
autoDelayHandler=setTimeout(function(){autoIntervalHandler=setInterval(function(){if(boostStepsCount>config.boostThreshold){if(autoMultiplier){calcStep(step*parseInt(boostMultiplier,10))
if(boostMultiplier<100000000){boostMultiplier=boostMultiplier*1.1}
if(stepMax){boostMultiplier=Math.min(stepMax,boostMultiplier)}}else{calcStep(step*boostMultiplier)}}else{calcStep(step)}
boostStepsCount++},config.autoInterval)},config.autoDelay)}}
function calcStep(step){if(isNaN(value)){value=0}
setValue(Math.round(value/step)*step+step)
dispatchEvent($original,"input")
dispatchEvent($original,"change")}
function resetTimer(){boostStepsCount=0
boostMultiplier=boostMultiplier=autoMultiplier?1:config.boostMultiplier
clearTimeout(autoDelayHandler)
clearTimeout(autoIntervalHandler)}
function updateAttributes(){$input.prop("required",$original.prop("required"))
$input.prop("placeholder",$original.prop("placeholder"))
var disabled=$original.prop("disabled")
$input.prop("disabled",disabled)
$buttonIncrement.prop("disabled",disabled)
$buttonDecrement.prop("disabled",disabled)
if(disabled){resetTimer()}
var originalClass=$original.prop("class")
var groupClass=""
if(/form-control-sm/g.test(originalClass)){groupClass="input-group-sm"}else if(/form-control-lg/g.test(originalClass)){groupClass="input-group-lg"}
var inputClass=originalClass.replace(/form-control(-(sm|lg))?/g,"")
$inputGroup.prop("class","input-group "+groupClass+" "+config.groupClass)
$input.prop("class","form-control "+inputClass)
min=parseFloat($original.prop("min"))||0
max=isNaN($original.prop("max"))||$original.prop("max")===""?Infinity:parseFloat($original.prop("max"))
step=parseFloat($original.prop("step"))||1
stepMax=parseInt($original.attr("data-step-max"))||0
decimals=parseInt($original.attr("data-decimals"))||0}})}
function onPointerUp(element,callback){element.addEventListener("mouseup",function(e){callback(e)})
element.addEventListener("touchend",function(e){callback(e)})
element.addEventListener("keyup",function(e){if(e.keyCode===32){spacePressed=!1
callback(e)}})}
function onPointerDown(element,callback){element.addEventListener("mousedown",function(e){e.preventDefault()
callback(e)})
element.addEventListener("touchstart",function(e){if(e.cancelable){e.preventDefault()}
callback(e)})
element.addEventListener("keydown",function(e){if(e.keyCode===32&&!spacePressed){spacePressed=!0
callback(e)}})}}(jQuery))