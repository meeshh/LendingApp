export const THROTTLE_NOTIF_THRESHOLD = 2000;
export const INTEREST_CONFIG = {
	initial: 0.1,
	extension_factor: 1.5,
};

export const FORM_CONFIG = {
	FRM_READY_TMFRM : 30, //submission ready timeframe 30 seconds
	SUB_TMFRM : 60, //submissions timeframe window 60seconds
	MAX_SUBS_PER_TMFRM : 3, //maximum loan submissions per timeframe 3 submissions
	MAX_AMNT_ALLOWED : 400, //maximum request is 400 Euros
	MIN_AMNT_ALLOWED : 0, //minimum request is 0 Euros
	RQST_WNDW_SPAN : 1, //the request window span sets the maximum time the user can ask the loan for. default 1 month
	RQST_WNDW_UNIT : 'month' //moment unit. 'day', 'week', 'month', 'year' //this is a moment unit
}
