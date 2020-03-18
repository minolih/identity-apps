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

import React, { useEffect, useState, SyntheticEvent } from "react";
import { PageLayout } from "../layouts";
import { ListLayout } from "../layouts";
import { PrimaryButton } from "@wso2is/react-components";
import { Icon, DropdownProps, PaginationProps, DropdownItemProps } from "semantic-ui-react";
import { ClaimsList, ListType, LocalClaimsSearch } from "../components";
import { Claim, ClaimsGetParams, AlertLevels } from "../models";
import { getAllLocalClaims, getADialect } from "../api";
import { DEFAULT_USER_LIST_ITEM_LIMIT, CLAIM_DIALECTS_PATH } from "../constants";
import { AddLocalClaims } from "../components";
import { useDispatch } from "react-redux";
import { addAlert } from "../store/actions";
import { history } from "../helpers";
import { filterList, sortList } from "../utils";

export const LocalClaimsPage = (): React.ReactElement => {

    const SORT_BY = [
        {
            text: "Name",
            key: 0,
            value: "displayName"
        },
        {
            text: "Claim URI",
            key: 1,
            value: "claimURI"
        }
    ];

    const [claims, setClaims] = useState<Claim[]>(null);
    const [offset, setOffset] = useState(0);
    const [listItemLimit, setListItemLimit] = useState<number>(0);
    const [openModal, setOpenModal] = useState(false);
    const [claimURIBase, setClaimURIBase] = useState("");
    const [filteredClaims, setFilteredClaims] = useState<Claim[]>(null);
    const [sortBy, setSortBy] = useState<DropdownItemProps>(SORT_BY[0]);
    const [sortOrder, setSortOrder] = useState(true);

    const dispatch = useDispatch();

    const getLocalClaims = (limit?: number, sort?: string, offset?: number, filter?: string) => {
        const params: ClaimsGetParams = {
            limit: limit || null,
            sort: sort || null,
            offset: offset || null,
            filter: filter || null
        };

        getAllLocalClaims(params).then(response => {
            setClaims(response);
            setFilteredClaims(response);
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description || "There was an error while fetching the local claims",
                    level: AlertLevels.ERROR,
                    message: error?.message || "Something went wrong"
                }
            ));
        });
    };

    useEffect(() => {
        setFilteredClaims(sortList(filteredClaims, sortBy.value as string, sortOrder));
    }, [sortBy, sortOrder]);

    useEffect(() => {
        setListItemLimit(DEFAULT_USER_LIST_ITEM_LIMIT);
        getLocalClaims(null, null, null, null);
        getADialect("local").then((response) => {
            setClaimURIBase(response.dialectURI);
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description || "There was an error while fetching the local dialect",
                    level: AlertLevels.ERROR,
                    message: error?.message || "Something went wrong"
                }
            ));
        });
    }, []);

    const paginate = (list: Claim[], limit: number, offset: number): Claim[] => {
        return list?.slice(offset, offset + limit);
    };

    const handleItemsPerPageDropdownChange = (event: React.MouseEvent<HTMLAnchorElement>, data: DropdownProps) => {
        setListItemLimit(data.value as number);
    };

    const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => {
        setOffset((data.activePage as number - 1) * listItemLimit);
    };

    const handleSortStrategyChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        setSortBy(SORT_BY.filter(option => option.value === data.value)[0]);
    };

    const handleSortOrderChange = (isAscending: boolean) => {
        setSortOrder(isAscending);
    };

    return (
        <>
            {
                openModal
                    ? <AddLocalClaims
                        open={ openModal }
                        onClose={ () => { setOpenModal(false) } }
                        claimID={ null }
                        update={ getLocalClaims }
                        claimURIBase={ claimURIBase }
                    />
                    : null
            }
            <PageLayout
                title="Local Dialect"
                description="View, edit and add the Local Dialect"
                showBottomDivider={ true }
                backButton={ {
                    onClick: () => { history.push(CLAIM_DIALECTS_PATH) },
                    text: "Go back to Claim Dialects"
                } }
            >
                <ListLayout
                    advancedSearch={
                        <LocalClaimsSearch
                            onFilter={ (query) => {
                                //getLocalClaims(null, null, null, query);
                                try {
                                    const filteredClaims = filterList(
                                        claims, query, sortBy.value as string, sortOrder
                                    );
                                    setFilteredClaims(filteredClaims);
                                } catch (error) {
                                    dispatch(addAlert({
                                        message: "Filter query format incorrect",
                                        description: error,
                                        level: AlertLevels.ERROR
                                    }));
                                }
                            } }
                            claimURIBase={ claimURIBase }
                        />
                    }
                    currentListSize={ listItemLimit }
                    listItemLimit={ listItemLimit }
                    onItemsPerPageDropdownChange={ handleItemsPerPageDropdownChange }
                    onPageChange={ handlePaginationChange }
                    onSortStrategyChange={ handleSortStrategyChange }
                    rightActionPanel={
                        (
                            <PrimaryButton
                                onClick={ () => {
                                    setOpenModal(true);
                                } }
                            >
                                <Icon name="add" />Add a Local Claim
                            </PrimaryButton>
                        )
                    }
                    leftActionPanel={ null }
                    showPagination={ true }
                    sortOptions={ SORT_BY }
                    sortStrategy={ sortBy }
                    totalPages={ Math.ceil(filteredClaims?.length / listItemLimit) }
                    totalListSize={ filteredClaims?.length }
                    onSortOrderChange={ handleSortOrderChange }
                >
                    <ClaimsList
                        list={ paginate(filteredClaims, listItemLimit, offset) }
                        localClaim={ ListType.LOCAL }
                        update={ getLocalClaims }
                    />
                </ListLayout>
            </PageLayout>
        </>
    );
};
