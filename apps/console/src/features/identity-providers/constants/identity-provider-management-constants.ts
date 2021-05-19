/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { DocumentationConstants } from "./documentation-constants";
import { IdentityProviderTemplateLoadingStrategies } from "../models";

/**
 * Class containing identity provider management constants.
 */
export class IdentityProviderManagementConstants {

    /**
     * Identifier for the local IDP.
     * @constant
     * @type {string}
     * @default
     */
    public static readonly LOCAL_IDP_IDENTIFIER: string = "LOCAL";

    /**
     * Doc key for the IDP overview page.
     * @constant
     * @type {string}
     */
    public static readonly IDP_OVERVIEW_DOCS_KEY = `${
        DocumentationConstants.PORTAL_DOCS_KEY }["Identity Providers"]["Overview"]`;

    /**
     * Doc key for the IDP edit page.
     * @constant
     * @type {string}
     */
    public static readonly IDP_EDIT_OVERVIEW_DOCS_KEY = `${
        DocumentationConstants.PORTAL_DOCS_KEY }["Identity Providers"]["Edit Identity Provider"]["Overview"]`;

    /**
     * Set of internal idps which are forbidden from deleting.
     * // TODO: Remove this once validating is available from the backend level.
     * @type {string[]}
     */
    public static readonly DELETING_FORBIDDEN_IDPS: string[] = [];

    /**
     * Key for the URL search param for IDP state.
     * @constant
     * @type {string}
     */
    public static readonly IDP_STATE_URL_SEARCH_PARAM_KEY = "state";

    /**
     * URL Search param for newly created IDPs.
     * @constant
     * @type {string}
     */
    public static readonly NEW_IDP_URL_SEARCH_PARAM = `?${
        IdentityProviderManagementConstants.IDP_STATE_URL_SEARCH_PARAM_KEY }=new`;

    /**
     * Key for the URL search param for IDP create wizard trigger.
     * @constant
     * @type {string}
     */
    public static readonly IDP_CREATE_WIZARD_TRIGGER_URL_SEARCH_PARAM_KEY = "open";

    /**
     * Set of IDP template Ids.
     * @type {Record<string, unknown>}
     */
    public static readonly IDP_TEMPLATE_IDS: Record<string, unknown> = {
        GOOGLE: "8ea23303-49c0-4253-b81f-82c0fe6fb4a0",
        OIDC: "oidc-idp",
        SAML: "saml-idp"
    };

    /**
     * Default IDP template loading strategy.
     * @constant
     * @type {IdentityProviderTemplateLoadingStrategies}
     */
    public static readonly DEFAULT_IDP_TEMPLATE_LOADING_STRATEGY: IdentityProviderTemplateLoadingStrategies =
        IdentityProviderTemplateLoadingStrategies.LOCAL;

    /**
     * Doc key for the IDP create page.
     * @constant
     * @type {string}
     */
    public static readonly IDP_TEMPLATES_CREATE_DOCS_KEY = `${
        DocumentationConstants.PORTAL_DOCS_KEY }["Identity Providers"]["Create New Identity Provider"]`;

    public static readonly IDENTITY_PROVIDER_TEMPLATE_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an " +
        "invalid status code while fetching identity provider template.";
    public static readonly IDENTITY_PROVIDER_TEMPLATE_FETCH_ERROR: string = "An error occurred while fetching " +
        "the required identity provider template.";
    public static readonly IDENTITY_PROVIDER_TEMPLATES_LIST_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an " +
        "invalid status code while fetching identity provider templates list.";
    public static readonly IDENTITY_PROVIDER_TEMPLATES_LIST_FETCH_ERROR: string = "An error occurred while fetching " +
        "the required identity provider templates list.";
    public static readonly IDENTITY_PROVIDER_JIT_PROVISIONING_UPDATE_ERROR: string = "An error occurred while" +
        " updating the JIT provisioning configurations of the identity provider.";
    public static readonly LOCAL_AUTHENTICATOR_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an invalid " +
        "status code while fetching local authenticators.";
    public static readonly LOCAL_AUTHENTICATOR_FETCH_ERROR: string = "An error occurred while fetching the local" +
        "authenticators.";
    public static readonly COMBINED_AUTHENTICATOR_FETCH_ERROR: string = "An error occurred while fetching the local" +
        "and federated authenticators.";
    public static readonly IDENTITY_PROVIDER_CLAIMS_UPDATE_ERROR: string = "An error occurred while updating claims " +
        "configurations of the identity provider.";
    public static readonly IDENTITY_PROVIDER_CERTIFICATE_UPDATE_ERROR: string = "An error occurred while updating " +
        "the certificate of the identity provider.";
    public static readonly BASIC_AUTH_REQUEST_PATH_AUTHENTICATOR: string = "BasicAuthRequestPathAuthenticator";
    public static readonly OAUTH_REQUEST_PATH_AUTHENTICATOR: string = "OAuthRequestPathAuthenticator";
    public static readonly PROVISIONING_CONNECTOR_DISPLAY_NAME: string = "displayName";
    public static readonly PROVISIONING_CONNECTOR_GOOGLE: string = "googleapps";
    public static readonly X509_AUTHENTICATOR: string = "x509CertificateAuthenticator";
    public static readonly SESSION_EXECUTOR_AUTHENTICATOR: string = "SessionExecutor";
    public static readonly TOTP_AUTHENTICATOR: string = "totp";
    public static readonly FIDO_AUTHENTICATOR: string = "FIDOAuthenticator";
    public static readonly BASIC_AUTHENTICATOR = "BasicAuthenticator";
    public static readonly IDENTIFIER_FIRST_AUTHENTICATOR = "IdentifierExecutor";

    // Known Enterprise authenticator IDs
    public static readonly OIDC_AUTHENTICATOR_ID: string = "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I";
    public static readonly SAML_AUTHENTICATOR_ID: string = "U0FNTFNTT0F1dGhlbnRpY2F0b3I";

    // Known Local Authenticator IDS.
    public static readonly BASIC_AUTHENTICATOR_ID: string = "QmFzaWNBdXRoZW50aWNhdG9y";
    public static readonly IDENTIFIER_FIRST_AUTHENTICATOR_ID: string = "SWRlbnRpZmllckV4ZWN1dG9y";
    public static readonly JWT_BASIC_AUTHENTICATOR_ID: string = "SldUQmFzaWNBdXRoZW50aWNhdG9y";
    public static readonly FIDO_AUTHENTICATOR_ID: string = "RklET0F1dGhlbnRpY2F0b3I";
    public static readonly TOTP_AUTHENTICATOR_ID: string = "dG90cA";
    public static readonly ACTIVE_SESSION_LIMIT_HANDLER_AUTHENTICATOR_ID: string = "U2Vzc2lvbkV4ZWN1dG9y";
    public static readonly X509_CERTIFICATE_AUTHENTICATOR_ID: string = "eDUwOUNlcnRpZmljYXRlQXV0aGVudGljYXRvcg";
    public static readonly BASIC_AUTH_AUTHENTICATOR_ID: string = "QmFzaWNBdXRoUmVxdWVzdFBhdGhBdXRoZW50aWNhdG9y";
    public static readonly OAUTH_BEARER_AUTHENTICATOR_ID: string = "T0F1dGhSZXF1ZXN0UGF0aEF1dGhlbnRpY2F0b3I";

    // Known Social authenticator IDs.
    public static readonly GOOGLE_OIDC_AUTHENTICATOR_ID: string = "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I";
    public static readonly FACEBOOK_AUTHENTICATOR_ID: string = "RmFjZWJvb2tBdXRoZW50aWNhdG9y";
    public static readonly TWITTER_AUTHENTICATOR_ID: string = "VHdpdHRlckF1dGhlbnRpY2F0b3I";
    
    // Known Social authenticator names;
    public static readonly GOOGLE_OIDC_AUTHENTICATOR_NAME: string = "GoogleOIDCAuthenticator";
}
