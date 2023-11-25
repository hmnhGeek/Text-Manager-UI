"use client";

import styles from './titles.module.css';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAvailablePlatforms } from "@/redux/actions/platformsActions";
import { RootState, AppDispatch } from "@/redux/store";
import { connect } from "react-redux";
import cookie from 'js-cookie';
import { fetchTitlesFromPlatform } from "@/redux/actions/titlesActions";
import CollapsibleCard from "../components/CollapsibleCard/CollapsibleCard";
import { TitlesType } from '@/redux/initialStates/titlesInitialState';
import CustomBreadcrumbs from '../components/Breadcrumbs/CustomBreadcrumbs';

interface TitlesPageProps {
    token: string | null;
    titles: TitlesType[];
    platform: string | null;
    pageError: string | null;
    fetchAvailablePlatforms: (token: string) => void;
    fetchTitlesFromPlatform: (token: string, platform: string) => void;
}

const TitlesPage: React.FC<TitlesPageProps> = props => {
    const router = useRouter();
    const { token, titles, platform, pageError } = props;

    useEffect(() => {
        if(pageError) {
            cookie.set("apiError", pageError);
            window.location.replace("/login");
        }
    }, [pageError]);

    useEffect(() => {
        if(token && platform) props.fetchTitlesFromPlatform(token, platform); 
        else {
            cookie.set("apiError", "Please prove your identity!");
            router.push("/login");
        }
    }, []);

    if(titles && titles.length > 0) {
        return (
            <div className={styles.gridContainer}>
                <h1>Titles Available in {platform}</h1>
                <CustomBreadcrumbs />
                <div className={styles.cardGrid}>
                    {titles.map((obj) => (
                    <CollapsibleCard
                        title={obj.title}
                        prompts={obj.prompts}
                    />
                    ))}
                </div>
            </div>
        );
    }
    
    return null;
}

const mapStateToProps = (state: RootState) => {
    return {
        token: state.auth.token,
        platform: state.titles.platform,
        titles: state.titles.titles,
        pageError: state.titles.error,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token)),
        fetchTitlesFromPlatform: (token: string, platform: string) => dispatch(fetchTitlesFromPlatform(token, platform)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);