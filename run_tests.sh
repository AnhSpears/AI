#!/usr/bin/env bash

# Thoát ngay nếu có lệnh nào lỗi
set -e

# 1. Code Style Check (Yêu cầu flake8 được cài):
echo "[Test] Running flake8 style check..."
flake8 repo/

# 2. Type Checking (Yêu cầu mypy được cài):
echo "[Test] Running mypy type check..."
mypy repo/

# 3. Unit Tests (Yêu cầu pytest được cài):
echo "[Test] Running pytest unit tests..."
pytest repo/ --maxfail=1 --disable-warnings -q

# 4. (Tùy chọn) Kiểm thử tích hợp khác:
# echo "[Test] Running integration tests..."
# ./scripts/integration_tests.sh

# Kết thúc

echo "All tests passed successfully!"
exit 0
