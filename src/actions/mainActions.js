import {NotificationManager} from 'react-notifications';
import {THROTTLE_NOTIF_THRESHOLD} from '../CONFIGApp.js';

export function throttleNotification(message, title, type, notifTimeout){
	return dispatch => {
		switch (type) {
			case 'warning':
				return NotificationManager.warning(message, title + '!', (notifTimeout) ? notifTimeout : THROTTLE_NOTIF_THRESHOLD);
			case 'success':
				return NotificationManager.success(message, title + '!', (notifTimeout) ? notifTimeout : THROTTLE_NOTIF_THRESHOLD, null, true);
			case 'error':
				return NotificationManager.error(message, title + '!', (notifTimeout) ? notifTimeout : THROTTLE_NOTIF_THRESHOLD);
			default:
				return NotificationManager.info(message, title + '!', (notifTimeout) ? notifTimeout : THROTTLE_NOTIF_THRESHOLD);
		}
	}
}
