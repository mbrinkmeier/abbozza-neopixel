/**
 * @license
 * abbozza!
 *
 * Copyright 2015 Michael Brinkmeier ( michael.brinkmeier@uni-osnabrueck.de )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/**
 * @fileoverview Blocks for teachers
 * 
 * @author michael.brinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 */

DEV_TYPE_NEOPIXEL_STRIP = 1001;

Abbozza.DeviceNeoPixelStrip = {
    devtype: DEV_TYPE_NEOPIXEL_STRIP,
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.NEOPIXEL"));
        this.appendDummyInput()
            .appendField(_("dev.DEVICE"));
        this.appendDummyInput()
            .appendField(_("dev.NEOPIXELSTRIP"))
            .appendField(new FieldDevNameInput("<default>", Abbozza.blockDevices, this), "NAME");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(_("dev.AT"))
            .appendField(new PinDropdown(PinDropdown.DIGITAL), "PIN");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(_("dev.COUNTLEDS"))
            .appendField(new Blockly.FieldTextInput("0",Validator.numericalValidator), "COUNT");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(_("dev.FREQUENCY"))
            .appendField(new Blockly.FieldDropdown([["800 kHz","NEO_KHZ800"],["400 kHz","NEO_KHZ400"]]), "FREQUENCY");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(_("dev.CODING"))
            .appendField(new Blockly.FieldDropdown([["GRB","NEO_GRB"],["RGB","NEO_RGB"]]), "CODING");
        this.setInputsInline(false);
        this.setOutput(false);
        this.setPreviousStatement(true, "DEVICE");
        this.setNextStatement(true, "DEVICE");
        this.setTooltip('');
        Abbozza.addDisposeHandler(this);
    },
    
    getName: function () {
        return this.getFieldValue("NAME");
    },
    
    generateCode: function (generator) {
        generator.addLibrary("Adafruit_NeoPixel.h");
        var pin = generator.fieldToCode(this, "PIN");
        var name = generator.fieldToCode(this, "NAME");
        var count = generator.fieldToCode(this, "COUNT");
        var freq = generator.fieldToCode(this, "FREQUENCY");
        var order = generator.fieldToCode(this, "CODING");
        
        generator.addPreSetup("Adafruit_NeoPixel _dev_" + this.getName() + "("
            + count + "," + pin + "," + freq + "+" + order + ");");

        return "";
    },
    
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};


Abbozza.NeoPixelBegin = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.NEOPIXEL"));
    this.appendDummyInput()
        .appendField(_("dev.NEOPIXEL_BEGIN"))
        .appendField(new DeviceDropdown(this, DEV_TYPE_NEOPIXEL_STRIP, Abbozza.blockDevices), "NAME");
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setOutput(false);
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
  	var name = this.getFieldValue("NAME");
  	return "_dev_" + name + ".begin();";
  }
};

Abbozza.NeoPixelShow = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.NEOPIXEL"));
    this.appendDummyInput()
        .appendField(_("dev.NEOPIXEL_SHOW"))
        .appendField(new DeviceDropdown(this, DEV_TYPE_NEOPIXEL_STRIP, Abbozza.blockDevices), "NAME");
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
  	var name = this.getFieldValue("NAME");
  	return "_dev_" + name + ".show();";
  }
  
};

Abbozza.NeoPixelSetPixelRGBW = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.MATH"));
    this.appendDummyInput()
        .appendField(__("dev.NEOPIXEL_SETCOLOR",0))
        .appendField(new DeviceDropdown(this, DEV_TYPE_NEOPIXEL_STRIP, Abbozza.blockDevices), "NAME");
    this.appendValueInput("NUMBER")
        .appendField(__("dev.NEOPIXEL_SETCOLOR",1))
        .setCheck("NUMBER");
    this.appendValueInput("RED")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_RED"))
        .setCheck("NUMBER");
    this.appendValueInput("GREEN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_GREEN"))
        .setCheck("NUMBER");
    this.appendValueInput("BLUE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_BLUE"))
        .setCheck("NUMBER");
    this.appendValueInput("WITE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_WHITE"))
        .setCheck("NUMBER");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
  	var name = this.getFieldValue("NAME");
  	var number = this.getFieldValue("NUMBER");
  	var red = this.getFieldValue("RED");
  	var green = this.getFieldValue("GREEN");
  	var blue = this.getFieldValue("BLUE");
  	var white = this.getFieldValue("WHITE");
  	return "_dev_" + name + ".setPixelColor("
            + number + "," + red + "," + green + "," + blue + "," + white + ");";
  }
  
};


Abbozza.NeoPixelSetPixelRGB = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.MATH"));
    this.appendDummyInput()
        .appendField(__("dev.NEOPIXEL_SETCOLOR",0))
        .appendField(new DeviceDropdown(this, DEV_TYPE_NEOPIXEL_STRIP, Abbozza.blockDevices), "NAME");
    this.appendValueInput("NUMBER")
        .appendField(__("dev.NEOPIXEL_SETCOLOR",1))
        .setCheck("NUMBER");
    this.appendValueInput("RED")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_RED"))
        .setCheck("NUMBER");
    this.appendValueInput("GREEN")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_GREEN"))
        .setCheck("NUMBER");
    this.appendValueInput("BLUE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(_("dev.NEOPIXEL_BLUE"))
        .setCheck("NUMBER");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
  	var name = this.getFieldValue("NAME");
  	var number = this.getFieldValue("NUMBER");
  	var red = this.getFieldValue("RED");
  	var green = this.getFieldValue("GREEN");
  	var blue = this.getFieldValue("BLUE");
  	return "_dev_" + name + ".setPixelColor("
            + number + "," + red + "," + green + "," + blue + ");";
  }
  
};


Blockly.Blocks['dev_neopixel_strip'] = Abbozza.DeviceNeoPixelStrip;
Blockly.Blocks['dev_neopixel_begin'] = Abbozza.NeoPixelBegin;
Blockly.Blocks['dev_neopixel_show'] = Abbozza.NeoPixelShow;
Blockly.Blocks['dev_neopixel_rgbw'] = Abbozza.NeoPixelSetPixelRGBW;
Blockly.Blocks['dev_neopixel_rgb'] = Abbozza.NeoPixelSetPixelRGB;
