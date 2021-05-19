/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import keyBy from "lodash-es/keyBy";
import merge from "lodash-es/merge";
import values from "lodash-es/values";
import { ComponentType, LazyExoticComponent, ReactElement, lazy } from "react";
import GeneralIdentityProviderTemplateCategory from "./categories/general-identity-provider-template-category.json";
import EnterpriseOIDCIdentityProviderTemplate
    from "./templates/oidc-identity-provider/enterprise-oidc-identity-provider.json";
import EnterpriseIdentityProviderTemplate
    from "./templates/enterprise-identity-provider/enterprise-identity-provider.json";
import FacebookIDPTemplate from "./templates/facebook/facebook.json";
import GihubIDPTemplate from "./templates/github/github.json";
import GoogleIDPTemplate from "./templates/google/google.json";
import { ExtensionsManager, identityProviderConfig } from "../../../../extensions";
import { EnterpriseIdentityProviderTemplateExtension }
    from "../../../../extensions/configs/identity-providers-templates";
import {
    IdentityProviderTemplateCategoryInterface,
    IdentityProviderTemplateListItemInterface
} from "../../models";

const EnterpriseIdentityProviderTemplateExtended = {
    ...EnterpriseIdentityProviderTemplate
    , ...EnterpriseIdentityProviderTemplateExtension
};

export interface IdentityProviderTemplatesConfigInterface {
    categories: TemplateConfigInterface<IdentityProviderTemplateCategoryInterface>[];
    templates: TemplateConfigInterface<IdentityProviderTemplateListItemInterface>[];
}

export interface TemplateConfigInterface<T> {
    content?: TemplateContentInterface;
    enabled: boolean;
    id: string;
    resource?: T | Promise<T> | string;
}

export interface TemplateContentInterface extends StrictTemplateContentInterface {
    [ key: string ]: any;
}

export interface StrictTemplateContentInterface {
    wizardHelp?: LazyExoticComponent<ComponentType<any>> | ReactElement | any;
}

export const getIdentityProviderTemplatesConfig = (): IdentityProviderTemplatesConfigInterface => {

    const extensionsManager: ExtensionsManager = ExtensionsManager.getInstance();

    return {
        categories: values(
            merge(
                keyBy(
                    [
                        {
                            enabled: true,
                            id: GeneralIdentityProviderTemplateCategory.id,
                            resource: GeneralIdentityProviderTemplateCategory
                        }
                    ],
                    "id"
                ),
                keyBy(extensionsManager.getIdentityProviderTemplatesConfig().categories, "id")
            )
        ),
        templates: values(
            merge(
                keyBy(
                    [
                        {
                            content: {
                                wizardHelp: lazy(() => import("./templates/google/create-wizard-help"))
                            },
                            enabled: identityProviderConfig.templates.google,
                            id: GoogleIDPTemplate.id,
                            resource: GoogleIDPTemplate
                        },
                        {
                            content: {
                                wizardHelp: lazy(() => import("./templates/facebook/create-wizard-help"))
                            },
                            enabled: identityProviderConfig.templates.facebook,
                            id: FacebookIDPTemplate.id,
                            resource: FacebookIDPTemplate
                        },
                        {
                            content: {
                                wizardHelp: lazy(() => import("./templates/github/create-wizard-help"))
                            },
                            enabled: identityProviderConfig.templates.github,
                            id: GihubIDPTemplate.id,
                            resource: GihubIDPTemplate
                        },
                        {
                            content: {
                                wizardHelp: lazy(() =>
                                    import("./templates/enterprise-identity-provider/create-wizard-help")
                                )
                            },
                            enabled: identityProviderConfig.templates.enterprise,
                            id: EnterpriseIdentityProviderTemplateExtended.id,
                            resource: EnterpriseIdentityProviderTemplateExtended
                        },
                        {
                            content: {
                                wizardHelp: lazy(() =>
                                    import("./templates/oidc-identity-provider/create-wizard-help")
                                )
                            },
                            enabled: identityProviderConfig.templates.enterprise,
                            id: EnterpriseOIDCIdentityProviderTemplate.id,
                            resource: EnterpriseOIDCIdentityProviderTemplate
                        }
                    ],
                    "id"
                ),
                keyBy(extensionsManager.getIdentityProviderTemplatesConfig().templates, "id")
            )
        )
    };
};
