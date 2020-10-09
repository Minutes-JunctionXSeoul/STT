const start_stt = this.document.getElementById('start_stt');
start_stt.addEventListener('click', function () {
	const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
		'fa50041df8f34ef3a14a9ef22b910602',
		'koreacentral',
	);

	const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

	// const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig);

	// recognizer.recognizing = (s, e) => {
	// 	console.log(`RECOGNIZING: Text=${e.result.text}`);
	// };

	recognizer.recognized = (s, e) => {
		if (e.result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
			console.log(`RECOGNIZED: Text=${e.result.text}`);
		} else if (e.result.reason == SppeechSDK.ResultReason.NoMatch) {
			console.log('NOMATCH: Speech could not be recognized.');
		}
	};

	recognizer.canceled = (s, e) => {
		console.log(`CANCELED: Reason=${e.reason}`);

		if (e.reason == SpeechSDK.CancellationReason.Error) {
			console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
			console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
			console.log('CANCELED: Did you update the subscription info?');
		}

		recognizer.stopContinuousRecognitionAsync();
	};

	recognizer.sessionStopped = (s, e) => {
		console.log('\n    Session stopped event.');
		recognizer.stopContinuousRecognitionAsync();
	};

	recognizer.startContinuousRecognitionAsync();
});
