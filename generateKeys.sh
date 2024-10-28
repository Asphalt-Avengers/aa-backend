#!/bin/bash

# Generate Access Token Private and Public Keys
openssl genpkey -algorithm RSA -out access_private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in access_private_key.pem -out access_public_key.pem
ACCESS_TOKEN_PRIVATE_KEY=$(<access_private_key.pem)
ACCESS_TOKEN_PUBLIC_KEY=$(<access_public_key.pem)

# Generate Refresh Token Private and Public Keys
openssl genpkey -algorithm RSA -out refresh_private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in refresh_private_key.pem -out refresh_public_key.pem
REFRESH_TOKEN_PRIVATE_KEY=$(<refresh_private_key.pem)
REFRESH_TOKEN_PUBLIC_KEY=$(<refresh_public_key.pem)

# Encode keys in Base64
ACCESS_TOKEN_PRIVATE_KEY_B64=$(echo -n "$ACCESS_TOKEN_PRIVATE_KEY" | base64)
ACCESS_TOKEN_PUBLIC_KEY_B64=$(echo -n "$ACCESS_TOKEN_PUBLIC_KEY" | base64)
REFRESH_TOKEN_PRIVATE_KEY_B64=$(echo -n "$REFRESH_TOKEN_PRIVATE_KEY" | base64)
REFRESH_TOKEN_PUBLIC_KEY_B64=$(echo -n "$REFRESH_TOKEN_PUBLIC_KEY" | base64)

# Define your database URL here
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"

# Append to .env file with explicit newlines for multi-line keys
{
  echo "DATABASE_URL=\"$DATABASE_URL\""
  echo "ACCESS_TOKEN_PRIVATE_KEY=\"$ACCESS_TOKEN_PRIVATE_KEY_B64\""
  echo "ACCESS_TOKEN_PUBLIC_KEY=\"$ACCESS_TOKEN_PUBLIC_KEY_B64\""
  echo "REFRESH_TOKEN_PRIVATE_KEY=\"$REFRESH_TOKEN_PRIVATE_KEY_B64\""
  echo "REFRESH_TOKEN_PUBLIC_KEY=\"$REFRESH_TOKEN_PUBLIC_KEY_B64\""
} > .env

# Clean up temporary key files
rm access_private_key.pem access_public_key.pem refresh_private_key.pem refresh_public_key.pem

echo ".env file created with Base64 encoded keys."
