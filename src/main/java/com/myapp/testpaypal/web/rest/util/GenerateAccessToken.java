package com.myapp.testpaypal.web.rest.util;

import com.paypal.base.ConfigManager;
import com.paypal.base.Constants;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;

/**
 * @author dassiorleando
 */
public class GenerateAccessToken {

	public static String getAccessToken() throws PayPalRESTException {

		// ###AccessToken
		// Retrieve the access token from
		// OAuthTokenCredential by passing in
		// ClientID and ClientSecret
		String clientID = ConfigManager.getInstance().getValue(Constants.CLIENT_ID);
		String clientSecret = ConfigManager.getInstance().getValue(
				Constants.CLIENT_SECRET);

		return new OAuthTokenCredential(clientID, clientSecret)
				.getAccessToken();
	}
}
