const start_stt = this.document.getElementById('start_stt');
const stop_stt = this.document.getElementById('stop_stt');
let return_str;

start_stt.addEventListener('click', function () {
	const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
		'fa50041df8f34ef3a14a9ef22b910602',
		'koreacentral',
	);
	return_str = '';
	const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

	recognizer.recognized = (s, e) => {
		if (e.result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
			console.log(`RECOGNIZED: Text=${e.result.text}`);
			return_str += ` ${e.result.text}`;
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
		console.log('Whole text:' + return_str); // return_str을 서버로 post하면 완료
		recognizer.stopContinuousRecognitionAsync();
	});
});
