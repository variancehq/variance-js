#!/usr/bin/env bash

set -euo pipefail

if [[ $GITHUB_REF == refs/heads/* ]]; then
  BRANCH=${GITHUB_REF#refs/heads/}
  echo "VERSION=$GITHUB_SHA" >> $GITHUB_ENV
  case $BRANCH in
      dev)
        echo "GCP_BUCKET=variancejs.variance.fyi" >> $GITHUB_ENV
        echo "GCP_PROJECT_ID=variance-app-dev" >> $GITHUB_ENV
        echo "GCP_SERVICE_ACCOUNT=github-variancejs@variance-app-dev.iam.gserviceaccount.com" >> $GITHUB_ENV
        echo "GCP_SERVICE_KEY=${GCP_SA_KEY_DEV}" >> $GITHUB_ENV
        ;;
      *)
        echo "GCP_BUCKET=variancejs.variance.fun" >> $GITHUB_ENV
        echo "GCP_PROJECT_ID=variance-app-staging" >> $GITHUB_ENV
        echo "GCP_SERVICE_ACCOUNT=github-variancejs@variance-app-staging.iam.gserviceaccount.com" >> $GITHUB_ENV
        echo "GCP_SERVICE_KEY=${GCP_SA_KEY_STAGING}" >> $GITHUB_ENV
        ;;
  esac
elif [[ $GITHUB_REF == refs/tags/* ]]; then
  echo "GCP_BUCKET=variancejs.variance.com" >> $GITHUB_ENV
  echo "GCP_PROJECT_ID=variance-app-prod" >> $GITHUB_ENV
  echo "GCP_SERVICE_ACCOUNT=github-variancejs@variance-app-prod.iam.gserviceaccount.com" >> $GITHUB_ENV
  echo "GCP_SERVICE_KEY=${GCP_SA_KEY_PROD}" >> $GITHUB_ENV
  echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_ENV
fi
