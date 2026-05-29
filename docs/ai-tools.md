# AI Tools Setup

이 문서는 이 WSL/Codex 환경에 설치한 AI 보조 도구들을 정리한다.

크게 두 종류가 있다.

- **Skill**: Codex에게 특정 작업 방식을 알려주는 지침 파일
- **MCP/agent tool**: Codex가 코드 분석, 검색, 리뷰 같은 작업에 사용할 수 있는 외부 도구

새 skill 또는 MCP 설정은 보통 **Codex를 재시작해야** 인식된다.

## Installed Skills

설치 위치:

```text
/home/dong/.codex/skills
```

설치한 skill 목록:

- `grill-me`
- `to-prd`
- `to-issues`
- `caveman`
- `handoff`
- `improve-codebase-architecture`

### grill-me

계획, 설계, 아이디어를 강하게 검증할 때 쓴다.

사용하면 Codex가 한 번에 결론을 내기보다 질문을 하나씩 던지면서 모호한 부분을 좁힌다. 사용자가 놓친 제약, 의사결정, 예외 케이스를 찾는 용도다.

사용하기 좋은 경우:

- 새 기능을 만들기 전 요구사항을 점검할 때
- DB 구조, API 설계, 화면 흐름을 정하기 전
- "이 계획 괜찮은지 빡세게 물어봐줘" 같은 상황

예시:

```text
grill-me: 어장관리 웹앱의 고객 태그 기능 설계를 검증해줘
```

### to-prd

현재 대화 내용과 코드베이스 이해를 바탕으로 PRD를 만들 때 쓴다.

PRD는 "무엇을 왜 만들지"를 정리한 제품 요구사항 문서다. 이 skill은 사용자를 다시 인터뷰하기보다, 이미 대화에서 나온 내용을 합성해서 문서화하는 쪽에 가깝다.

사용하기 좋은 경우:

- 기능 아이디어가 어느 정도 정리된 뒤
- 구현 전에 문제, 해결책, 유저 스토리, 테스트 방향을 문서로 남기고 싶을 때
- 이후 `to-issues`로 작업 티켓을 쪼개기 전

예시:

```text
to-prd: 지금까지 이야기한 고객 관리 기능을 PRD로 정리해줘
```

주의:

- 이 skill은 issue tracker에 publish하는 흐름을 전제로 한다.
- 현재 프로젝트에 issue tracker 설정이 없으면 문서 초안까지만 의미 있게 쓸 수 있다.

### to-issues

PRD, 설계안, 계획을 구현 가능한 이슈 목록으로 쪼갤 때 쓴다.

핵심은 "레이어별 작업"이 아니라 "작게 완성 가능한 세로 조각"으로 나누는 것이다. 예를 들어 "DB 작업", "API 작업", "UI 작업"으로 나누기보다, "고객 생성이 DB/API/UI까지 최소 동작한다"처럼 end-to-end로 나눈다.

사용하기 좋은 경우:

- PRD를 실제 개발 작업으로 바꿀 때
- 여러 agent나 사람이 나눠서 작업할 수 있게 만들 때
- 기능을 너무 크게 잡아서 어디서 시작할지 애매할 때

예시:

```text
to-issues: 이 PRD를 구현 가능한 이슈들로 쪼개줘
```

주의:

- 이 skill도 issue tracker publish 흐름을 전제로 한다.
- 실제 GitHub issue로 올리려면 GitHub/issue tracker 연결 상태가 필요하다.

### caveman

응답을 매우 짧고 압축해서 받고 싶을 때 쓴다.

불필요한 인사, 완곡한 표현, 긴 설명을 줄이고 기술 내용만 남기는 모드다. 긴 작업 중 토큰을 아끼거나 빠르게 지시하고 싶을 때 유용하다.

사용하기 좋은 경우:

- 답변을 짧게 받고 싶을 때
- 이미 맥락을 알고 있어서 자세한 설명이 필요 없을 때
- 긴 작업 중 토큰을 아끼고 싶을 때

예시:

```text
caveman mode
```

끄는 예시:

```text
normal mode
```

주의:

- 한 번 켜면 이후 응답에도 계속 적용되는 성격의 skill이다.
- 보안 경고, 삭제 같은 위험 작업에서는 필요한 설명이 다시 길어질 수 있다.

### handoff

현재 대화를 다음 Codex 세션이나 다른 agent에게 넘길 문서로 정리할 때 쓴다.

대화가 길어졌거나, 작업을 중간에 끊고 나중에 이어서 해야 할 때 유용하다. 민감한 정보는 제거하고, 다음 세션이 알아야 할 핵심 상태와 추천 skill을 정리한다.

사용하기 좋은 경우:

- 긴 작업을 오늘 여기서 멈추고 나중에 이어갈 때
- Codex를 재시작해야 하는데 맥락을 잃고 싶지 않을 때
- 다른 agent에게 작업을 넘길 때

예시:

```text
handoff: 다음 세션에서 배포 설정을 이어갈 수 있게 정리해줘
```

주의:

- 기본 동작은 현재 프로젝트가 아니라 OS 임시 디렉터리에 handoff 문서를 저장하는 것이다.

### improve-codebase-architecture

코드베이스 구조를 더 테스트하기 쉽고, 이해하기 쉽고, agent가 탐색하기 좋게 만들 개선 기회를 찾을 때 쓴다.

단순 코드 스타일 리뷰가 아니라, 모듈 경계, 결합도, 테스트 표면, 변경 집중도 같은 구조적 문제를 찾는 데 초점이 있다. 결과는 후보별 HTML 리포트 형태로 만드는 흐름이다.

사용하기 좋은 경우:

- 프로젝트가 커져서 구조가 복잡해졌을 때
- 같은 개념을 이해하려고 여러 파일을 계속 오가야 할 때
- 테스트하기 어려운 코드가 늘어났을 때
- 리팩터링 우선순위를 정하고 싶을 때

예시:

```text
improve-codebase-architecture: 현재 코드베이스에서 리팩터링 후보를 찾아줘
```

주의:

- 현재 프로젝트처럼 코드 파일이 거의 없을 때는 효과가 작다.
- 코드가 쌓인 뒤 실행하는 편이 더 의미 있다.

## Installed Agent Tool

### code-review-graph

설치 버전:

```text
code-review-graph 2.3.5
```

설치 위치:

```text
/home/dong/.local/share/code-review-graph-venv
```

실행 파일:

```text
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph
```

Codex MCP 설정:

```text
/home/dong/.codex/config.toml
```

Codex hooks 설정:

```text
/home/dong/.codex/hooks.json
```

프로젝트에 추가된 파일:

```text
.gitignore
.git/hooks/pre-commit
```

`.gitignore`에는 code-review-graph 캐시 폴더가 추가되어 있다.

```text
.code-review-graph/
```

#### 무엇을 하는 도구인가

`code-review-graph`는 코드베이스를 파싱해서 함수, 클래스, import, 호출 관계 같은 정보를 그래프로 저장하는 도구다.

목적은 AI 코드 리뷰나 영향 분석을 할 때 전체 파일을 무작정 읽지 않고, 변경과 관련된 코드만 더 잘 찾게 하는 것이다.

#### 사용하기 좋은 경우

- "이 변경이 어디까지 영향 주는지 봐줘"라고 물을 때
- PR/커밋 리뷰를 더 깊게 하고 싶을 때
- 테스트가 빠진 위험 지점을 찾고 싶을 때
- 프로젝트 파일이 많아져서 Codex가 전체 맥락을 잡기 어려울 때
- 아키텍처 핫스팟이나 복잡한 의존 관계를 보고 싶을 때

#### 현재 상태

초기 빌드는 실행했다.

현재 프로젝트에는 분석할 코드 파일이 거의 없어서 결과는 정상적으로 비어 있다.

```text
Files: 0
Nodes: 0
Edges: 0
```

코드가 생긴 뒤 다시 빌드하면 그래프가 채워진다.

#### 자주 쓰는 명령

전체 그래프 다시 만들기:

```bash
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph build
```

변경된 파일만 업데이트:

```bash
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph update
```

현재 그래프 상태 보기:

```bash
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph status
```

변경 영향 분석:

```bash
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph detect-changes --brief
```

시각화 HTML 만들기:

```bash
/home/dong/.local/share/code-review-graph-venv/bin/code-review-graph visualize
```

#### 자동으로 동작하는 부분

설치 과정에서 Codex hooks와 Git pre-commit hook이 추가되었다.

- Codex에서 파일 수정/명령 실행 후 graph update 시도
- Codex 세션 시작/재개 시 graph status 확인
- Git commit 전에 graph update와 변경 영향 분석 시도

원래 설치 도구는 `code-review-graph` 명령이 PATH에 있다고 가정했지만, 이 환경에서는 전용 venv에 설치했다. 그래서 hook 명령은 절대 경로를 사용하도록 수정했다.

#### 주의

- Codex에서 MCP 도구로 인식하려면 Codex 재시작이 필요하다.
- 현재 repo에 코드가 없으면 분석 결과가 비어 있는 게 정상이다.
- `.code-review-graph/`는 캐시/DB 폴더라 커밋하지 않는다.
- `.git/hooks/pre-commit`은 Git이 추적하지 않는 로컬 hook이다. 다른 PC에는 자동 공유되지 않는다.

## Mentioned But Not Installed

### context-mode

`context-mode`는 이번에 설치하지 않았다.

이 도구는 skill이 아니라 MCP/플러그인에 가까운 도구다. 큰 로그, 긴 파일 내용, 검색 결과를 대화 컨텍스트에 그대로 넣지 않고 외부 저장소에 보관한 뒤 필요한 부분만 꺼내게 도와준다.

사용하기 좋은 경우:

- Codex 작업이 길어져서 context compaction이 자주 발생할 때
- 큰 로그나 긴 파일 출력을 많이 다룰 때
- 대화 메모리 낭비를 줄이고 싶을 때

현재 설치한 `code-review-graph`와의 차이:

- `context-mode`: 도구 출력과 대화 컨텍스트 관리
- `code-review-graph`: 코드 구조와 변경 영향 분석

## Recommended Use Flow

기능을 만들기 전:

```text
grill-me -> to-prd -> to-issues
```

코드가 쌓인 뒤 구조 개선:

```text
code-review-graph build -> improve-codebase-architecture
```

짧게 대화하고 싶을 때:

```text
caveman
```

작업을 다음 세션으로 넘길 때:

```text
handoff
```

코드 리뷰나 영향 분석이 필요할 때:

```text
code-review-graph detect-changes --brief
```

