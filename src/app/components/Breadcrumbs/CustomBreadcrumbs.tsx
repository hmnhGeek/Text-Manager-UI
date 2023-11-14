import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { setPlatformForPromptsLoading } from '@/redux/actions/titlesActions';
import { connect } from 'react-redux';

interface CustomBreadcrumbsProps {
  setPlatformForPromptsLoading: (platform: string | null) => void;
}

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = props => {
  const router = useRouter();

  function handleClick(event: any) {
    event.preventDefault();
    const parts = event.target.href.split("/");

    const lastPart = parts[parts.length - 1];
    props.setPlatformForPromptsLoading(null);
    router.push(`/${lastPart}`);
  }

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/platforms">
            Platforms
        </Link>
        <Typography color="text.primary">Titles & Prompts</Typography>
      </Breadcrumbs>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
      setPlatformForPromptsLoading: (platform: string | null) => dispatch(setPlatformForPromptsLoading(platform)),
  }
}

export default connect(mapDispatchToProps)(CustomBreadcrumbs);