const start_stt = this.document.getElementById('start_stt');
const stop_stt = this.document.getElementById('stop_stt');
start_stt.addEventListener('click', function () {
	const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
		'fa50041df8f34ef3a14a9ef22b910602',
		'koreacentral',
	);

	const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

	recognizer.recognized = (s, e) => {
		if (e.result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
			console.log(`RECOGNIZED: Text=${e.result.text}`);
		} else if (e.result.reason == SppeechSDK.ResultReason.NoMatch) {
			console.log('NOMATCH: Speech could not be recognized.');
		}
	};

	recognizer.sessionStopped = (s, e) => {
		console.log('\n    Session stopped event.');
		recognizer.stopContinuousRecognitionAsync();
	};

	recognizer.startContinuousRecognitionAsync();

	stop_stt.addEventListener('click', function () {
		recognizer.stopContinuousRecognitionAsync();
	});
});
