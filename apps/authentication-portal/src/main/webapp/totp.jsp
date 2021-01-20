<%--
  ~ Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
  ~
  ~ WSO2 Inc. licenses this file to you under the Apache License,
  ~ Version 2.0 (the "License"); you may not use this file except
  ~ in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing,
  ~ software distributed under the License is distributed on an
  ~ "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  ~ KIND, either express or implied.  See the License for the
  ~ specific language governing permissions and limitations
  ~ under the License.
  --%>

<%@ page import="org.owasp.encoder.Encode" %>
<%@ page import="org.wso2.carbon.identity.application.authentication.endpoint.util.Constants" %>
<%@ page import="java.io.File" %>
<%@ page import="java.util.Map" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="includes/localize.jsp" %>

    <%
        request.getSession().invalidate();
        String queryString = request.getQueryString();
        Map<String, String> idpAuthenticatorMapping = null;
        if (request.getAttribute(Constants.IDP_AUTHENTICATOR_MAP) != null) {
            idpAuthenticatorMapping = (Map<String, String>) request.getAttribute(Constants.IDP_AUTHENTICATOR_MAP);
        }

        String errorMessage = AuthenticationEndpointUtil.i18n(resourceBundle,"error.retry");
        String authenticationFailed = "false";

        if (Boolean.parseBoolean(request.getParameter(Constants.AUTH_FAILURE))) {
            authenticationFailed = "true";

            if (request.getParameter(Constants.AUTH_FAILURE_MSG) != null) {
                errorMessage = Encode.forHtmlAttribute(request.getParameter(Constants.AUTH_FAILURE_MSG));

                 if (errorMessage.equalsIgnoreCase("authentication.fail.message") ||
                         errorMessage.equalsIgnoreCase("login.fail.message")) {
                    errorMessage = AuthenticationEndpointUtil.i18n(resourceBundle,"error.retry");
                }
            }
        }
    %>
    <html>
        <head>
            <!-- header -->
            <%
                File headerFile = new File(getServletContext().getRealPath("extensions/header.jsp"));
                if (headerFile.exists()) {
            %>
            <jsp:include page="extensions/header.jsp"/>
            <% } else { %>
            <jsp:include page="includes/header.jsp"/>
            <% } %>

            <script src="js/scripts.js"></script>
            <script src="/totpauthenticationendpoint/js/scripts.js"></script>
            <!--[if lt IE 9]>
            <script src="js/html5shiv.min.js"></script>
            <script src="js/respond.min.js"></script>
            <![endif]-->

            <script>
                // Handle form submission preventing double submission.
                $(document).ready(function(){
                    $.fn.preventDoubleSubmission = function() {
                        $(this).on('submit',function(e){
                            var $form = $(this);
                            if ($form.data('submitted') === true) {
                                // Previously submitted - don't submit again.
                                e.preventDefault();
                                console.warn("Prevented a possible double submit event");
                            } else {
                                // Mark it so that the next submit can be ignored.
                                $form.data('submitted', true);
                            }
                        });

                        return this;
                    };
                    $('#totpForm').preventDoubleSubmission();
                });
            </script>
        </head>

        <body class="login-portal layout totp-portal-layout">
            <main class="center-segment">
                <div class="ui container medium center aligned middle aligned">
                    <!-- product-title -->
                    <%
                        File productTitleFile = new File(getServletContext()
                                                .getRealPath("extensions/product-title.jsp"));
                        if (productTitleFile.exists()) {
                    %>
                    <jsp:include page="extensions/product-title.jsp"/>
                    <% } else { %>
                    <jsp:include page="includes/product-title.jsp"/>
                    <% } %>

                    <div class="ui segment">
                        <!-- page content -->
                        <h2><%=AuthenticationEndpointUtil.i18n(resourceBundle, "auth.totp")%></h2>
                        <div class="uii divider hidden"></div>
                        <%
                            if ("true".equals(authenticationFailed)) {
                        %>
                                <div class="ui negative message" id="failed-msg"><%=errorMessage%></div>
                                <div class="ui divider hidden"></div>
                        <% } %>

                        <input id="username" type="hidden"
                               value='<%=Encode.forHtmlAttribute(request.getParameter("username"))%>'>

                        <div class="segment-form">
                            <form action="../commonauth" method="post" id="totpForm" class="ui large form">
                                <p><%=AuthenticationEndpointUtil.i18n(resourceBundle, "enter.verification.code.got.by.device")%></p>
                                <div class="field">
                                    <input type="text" name="token" class="form-control" placeholder="<%=AuthenticationEndpointUtil.i18n(resourceBundle, "verification.code")%>">
                                </div>
                                <input id="sessionDataKey" type="hidden" name="sessionDataKey"
                                       value='<%=Encode.forHtmlAttribute(request.getParameter("sessionDataKey"))%>' />
                                <div class="ui divider hidden"></div>
                                <div class="align-right buttons">
                                    <a class="ui button link-button" id="genToken" href="#"
                                       onclick="return requestTOTPToken();">
                                       <%=AuthenticationEndpointUtil.i18n(resourceBundle, "get.verification.code")%>
                                    </a>
                                    <input type="submit" value="<%=AuthenticationEndpointUtil.i18n(resourceBundle, "authenticate")%>" class="ui primary button">
                                </div>
                            </form>
                        </div>
                        <div class="ui divider hidden"></div>
                            <%
                                String multiOptionURI = request.getParameter("multiOptionURI");
                                if (multiOptionURI != null) {
                            %>
                                <a class="ui button link-button" id="goBackLink"
                                href='<%=Encode.forHtmlAttribute(multiOptionURI)%>'>
                                    <%=AuthenticationEndpointUtil.i18n(resourceBundle, "choose.other.option")%>
                                </a>
                            <%
                                }
                            %>
                    </div>
                </div>
            </main>

            <!-- product-footer -->
            <%
                File productFooterFile = new File(getServletContext().getRealPath("extensions/product-footer.jsp"));
                if (productFooterFile.exists()) {
            %>
            <jsp:include page="extensions/product-footer.jsp"/>
            <% } else { %>
            <jsp:include page="includes/product-footer.jsp"/>
            <% } %>

            <!-- footer -->
            <%
                File footerFile = new File(getServletContext().getRealPath("extensions/footer.jsp"));
                if (footerFile.exists()) {
            %>
            <jsp:include page="extensions/footer.jsp"/>
            <% } else { %>
            <jsp:include page="includes/footer.jsp"/>
            <% } %>
        </body>
    </html>