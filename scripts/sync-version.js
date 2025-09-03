const fs = require('fs');
const path = require('path');

// 모듈 패키지 경로
const moduleAPath = path.resolve(__dirname, '../packages/moduleA/package.json');
const moduleBPath = path.resolve(__dirname, '../packages/moduleB/package.json');
const rootPath = path.resolve(__dirname, '../package.json');

// 패키지 JSON 읽기
const moduleA = require(moduleAPath);
const moduleB = require(moduleBPath);
const rootPackage = require(rootPath);

// 모든 패키지 중 가장 높은 버전 찾기
const versions = [moduleA.version, moduleB.version];
const highestVersion = versions.sort((a, b) => {
  const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
  const [bMajor, bMinor, bPatch] = b.split('.').map(Number);

  if (aMajor !== bMajor) return bMajor - aMajor;
  if (aMinor !== bMinor) return bMinor - aMinor;
  return bPatch - aPatch;
})[0];

// 루트 패키지 버전 업데이트
rootPackage.version = highestVersion;

// 파일 쓰기
fs.writeFileSync(
  rootPath,
  JSON.stringify(rootPackage, null, 2) + '\n'
);

console.log(`루트 패키지 버전이 ${highestVersion}으로 동기화되었습니다.`);