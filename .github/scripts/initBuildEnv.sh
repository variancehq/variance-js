#!/usr/bin/env bash

set -euo pipefail

echo "GCP_BUCKET=variancejs.variance.com" >> $GITHUB_ENV
echo "GCP_PROJECT_ID=variance-app-prod" >> $GITHUB_ENV
echo "GCP_SERVICE_ACCOUNT=github-variancejs@variance-app-prod.iam.gserviceaccount.com" >> $GITHUB_ENV
echo "GCP_SERVICE_KEY=${GCP_SA_KEY_PROD}" >> $GITHUB_ENV
echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_ENV
