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

interface TitlesPageProps {
    token: string | null;
    titles: string[];
    platform: string | null;
    fetchAvailablePlatforms: (token: string) => void;
    fetchTitlesFromPlatform: (token: string, platform: string) => void;
}

const TitlesPage: React.FC<TitlesPageProps> = props => {
    const router = useRouter();
    const { token, titles, platform } = props;

    useEffect(() => {
        if(token && platform) props.fetchTitlesFromPlatform(token, platform);
        else {
            cookie.set("apiError", "Please prove your identity!");
            router.push("/login");
        }
    }, []);

    useEffect(() => console.log(titles), [titles]);

    if(titles && titles.length > 0) {
        return (
            <div className={styles.gridContainer}>
                <h1>Titles Available in {platform}</h1>
                <div className={styles.cardGrid}>
                    {titles.map((title) => (
                    <CollapsibleCard
                        title={title}
                        prompts={["abc", "def"]}
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
        titles: state.titles.titles
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        fetchAvailablePlatforms: (token: string) => dispatch(fetchAvailablePlatforms(token)),
        fetchTitlesFromPlatform: (token: string, platform: string) => dispatch(fetchTitlesFromPlatform(token, platform)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlesPage);