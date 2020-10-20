import Utils from '../../../app.util';
import * as appConstanst from '../../../app.constants';

export class RequestModelSendOtp {
  version = appConstanst.VERSION;
  requestTime = Utils.getCurrentDate();
  otpChannel = ['EMAIL','PHONE'];
  id = appConstanst.IDS.sendOtpForServices;
  transactionID = '0987654321'; 
    constructor(private individualId : any,private individualIdType: any, private metadata?: any) {}
  
}