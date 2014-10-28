/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var fallbackSpeechSynthesis = window.getSpeechSynthesis();
        var fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();

        $('#translate').on('click', function() {
            var text = $('#text').val().trim();
            var lang = $('#lang').val();
            var fss = new fallbackSpeechSynthesisUtterance("Please enter a valid Text!");

            if (text.length == 0) {
                fallbackSpeechSynthesis.speak(fss);
                return;
            }

            $('#translated').hide();

            $.get('http://www.corsproxy.com/translate.google.com/translate_a/t?client=t&hl=en&sl=en&tl=' + lang + '&ie=UTF-8&oe=UTF-8&multires=1&otf=2&ssel=0&tsel=0&sc=1&q=' + encodeURI(text), function(data) {
                data = eval(data);
                var translateText = data[0][0][0];
                $('#translated-text').text(translateText);
                $('#translated').show();
                fss = new fallbackSpeechSynthesisUtterance(translateText);
                fss.lang = lang;
                fallbackSpeechSynthesis.speak(fss);
            });
        });

        var intro = "Welcome to Smart Mouth!!... Your Friend in Foreign Lands!";
        fallbackSpeechSynthesis.speak(new fallbackSpeechSynthesisUtterance(intro));
    }
};
