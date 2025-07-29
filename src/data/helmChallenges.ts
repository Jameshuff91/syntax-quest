import { Challenge } from './challenges';

export const helmChallenges: Challenge[] = [
  {
    id: "helm-101",
    title: "Your First Helm Chart",
    description: "Create a basic Helm chart structure. Helm is the package manager for Kubernetes!",
    starterCode: `# Create a Chart.yaml file for your Helm chart
# Chart.yaml
apiVersion: v2
name: my-app
description: # TODO: Add description
type: application
version: # TODO: Add version
appVersion: # TODO: Add app version`,
    solutionCode: `# Create a Chart.yaml file for your Helm chart
# Chart.yaml
apiVersion: v2
name: my-app
description: A Helm chart for my application
type: application
version: 0.1.0
appVersion: "1.0"`,
    hints: [
      {
        message: "Chart.yaml is the main file that describes your Helm chart"
      },
      {
        message: "version is the chart version, appVersion is your app's version",
        revealCode: `version: 0.1.0
appVersion: "1.0"`
      }
    ],
    tests: [
      {
        description: "Should have all required fields",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-102",
    title: "Basic Values File",
    description: "Create a values.yaml file to configure your Helm chart with default values",
    starterCode: `# values.yaml
# Default values for your application

# TODO: Add replicaCount
# TODO: Add image configuration
# TODO: Add service configuration`,
    solutionCode: `# values.yaml
# Default values for your application

replicaCount: 2

image:
  repository: nginx
  tag: "1.21"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80`,
    hints: [
      {
        message: "values.yaml contains default configuration values for your chart"
      },
      {
        message: "Include common configurations like replicas, image details, and service settings",
        revealCode: `replicaCount: 2

image:
  repository: nginx`
      }
    ],
    tests: [
      {
        description: "Should define basic configuration values",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-103",
    title: "Deployment Template",
    description: "Create a Kubernetes deployment template that uses Helm values",
    starterCode: `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: # TODO: Use value from values.yaml
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: # TODO: Build image string from values
        ports:
        - containerPort: # TODO: Use port from values`,
    solutionCode: `# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Release.Name }}
  template:
    metadata:
      labels:
        app: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        ports:
        - containerPort: {{ .Values.service.port }}`,
    hints: [
      {
        message: "Use {{ .Values.fieldName }} to reference values from values.yaml"
      },
      {
        message: "For nested values, use dot notation like {{ .Values.image.repository }}",
        revealCode: `replicas: {{ .Values.replicaCount }}`
      }
    ],
    tests: [
      {
        description: "Should use Helm templating for dynamic values",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-104",
    title: "Service Template",
    description: "Create a Kubernetes service template for your Helm chart",
    starterCode: `# templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: # TODO: Use release name
spec:
  type: # TODO: Use service type from values
  ports:
  - port: # TODO: Use port from values
    targetPort: # TODO: Use target port
  selector:
    # TODO: Add selector`,
    solutionCode: `# templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}
spec:
  type: {{ .Values.service.type }}
  ports:
  - port: {{ .Values.service.port }}
    targetPort: {{ .Values.service.port }}
  selector:
    app: {{ .Release.Name }}`,
    hints: [
      {
        message: "Services expose your pods to the network"
      },
      {
        message: "The selector must match the labels on your pods",
        revealCode: `selector:
    app: {{ .Release.Name }}`
      }
    ],
    tests: [
      {
        description: "Should create a proper service definition",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-105",
    title: "ConfigMap Template",
    description: "Create a ConfigMap to store application configuration",
    starterCode: `# templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
data:
  # TODO: Add app configuration
  # TODO: Add database URL using values
  # TODO: Add feature flags`,
    solutionCode: `# templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-config
data:
  app.properties: |
    server.port={{ .Values.service.port }}
    app.name={{ .Chart.Name }}
  database.url: {{ .Values.database.url | default "localhost:5432" }}
  feature.newUI: {{ .Values.features.newUI | default "false" | quote }}`,
    hints: [
      {
        message: "ConfigMaps store non-sensitive configuration data"
      },
      {
        message: "Use the 'default' function to provide fallback values",
        revealCode: `{{ .Values.database.url | default "localhost:5432" }}`
      }
    ],
    tests: [
      {
        description: "Should create ConfigMap with proper data",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-106",
    title: "Helm Install Command",
    description: "Write the Helm command to install your chart with custom values",
    starterCode: `# Write the helm install command
# TODO: Install chart named 'my-app' from current directory
# TODO: Set custom replica count to 3
# TODO: Set image tag to 'latest'`,
    solutionCode: `# Write the helm install command
helm install my-app . \
  --set replicaCount=3 \
  --set image.tag=latest`,
    hints: [
      {
        message: "Use 'helm install [RELEASE_NAME] [CHART]' to install a chart"
      },
      {
        message: "Use --set to override values from the command line",
        revealCode: `helm install my-app . --set replicaCount=3`
      }
    ],
    tests: [
      {
        description: "Should use correct helm install syntax",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-107",
    title: "Helm Upgrade with Rollback",
    description: "Write commands to upgrade a release and rollback if needed",
    starterCode: `# 1. TODO: Upgrade the 'my-app' release with new image tag
# 2. TODO: Check the release history
# 3. TODO: Rollback to previous version if needed`,
    solutionCode: `# 1. Upgrade the 'my-app' release with new image tag
helm upgrade my-app . --set image.tag=v2.0

# 2. Check the release history
helm history my-app

# 3. Rollback to previous version if needed
helm rollback my-app 1`,
    hints: [
      {
        message: "helm upgrade updates an existing release"
      },
      {
        message: "helm rollback [RELEASE] [REVISION] reverts to a previous version",
        revealCode: `helm upgrade my-app . --set image.tag=v2.0`
      }
    ],
    tests: [
      {
        description: "Should demonstrate upgrade and rollback",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-108",
    title: "Ingress Template",
    description: "Create an Ingress resource to expose your application",
    starterCode: `# templates/ingress.yaml
{{- if .Values.ingress.enabled -}}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ .Release.Name }}
spec:
  rules:
  - host: # TODO: Use host from values
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: # TODO: Reference service name
            port:
              number: # TODO: Use service port
{{- end }}`,
    solutionCode: `# templates/ingress.yaml
{{- if .Values.ingress.enabled -}}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ .Release.Name }}
spec:
  rules:
  - host: {{ .Values.ingress.host }}
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: {{ .Release.Name }}
            port:
              number: {{ .Values.service.port }}
{{- end }}`,
    hints: [
      {
        message: "Ingress resources manage external access to services"
      },
      {
        message: "The {{- if -}} template conditionally includes resources",
        revealCode: `host: {{ .Values.ingress.host }}`
      }
    ],
    tests: [
      {
        description: "Should create conditional Ingress resource",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-109",
    title: "NOTES.txt Template",
    description: "Create a NOTES.txt file to display post-installation instructions",
    starterCode: `# templates/NOTES.txt
# TODO: Add installation success message
# TODO: Show how to get the application URL
# TODO: Include port-forward command for local testing`,
    solutionCode: `# templates/NOTES.txt
1. Get the application URL by running these commands:
{{- if .Values.ingress.enabled }}
  http://{{ .Values.ingress.host }}/
{{- else }}
  kubectl port-forward service/{{ .Release.Name }} 8080:{{ .Values.service.port }}
  echo "Visit http://localhost:8080 to use your application"
{{- end }}

2. Check deployment status:
  kubectl get pods -l app={{ .Release.Name }}`,
    hints: [
      {
        message: "NOTES.txt is displayed after helm install/upgrade"
      },
      {
        message: "Include helpful commands for users to access their application",
        revealCode: `kubectl port-forward service/{{ .Release.Name }} 8080:{{ .Values.service.port }}`
      }
    ],
    tests: [
      {
        description: "Should provide helpful post-install instructions",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "helm-110",
    title: "Helm Dependency Management",
    description: "Define chart dependencies in Chart.yaml",
    starterCode: `# Chart.yaml
apiVersion: v2
name: my-app
version: 0.1.0
# TODO: Add PostgreSQL as a dependency
# TODO: Add Redis as a dependency with specific version`,
    solutionCode: `# Chart.yaml
apiVersion: v2
name: my-app
version: 0.1.0
dependencies:
  - name: postgresql
    version: "12.1.0"
    repository: https://charts.bitnami.com/bitnami
  - name: redis
    version: "17.3.0"
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled`,
    hints: [
      {
        message: "Dependencies allow you to include other charts"
      },
      {
        message: "Use 'condition' to make dependencies optional",
        revealCode: `dependencies:
  - name: postgresql
    version: "12.1.0"
    repository: https://charts.bitnami.com/bitnami`
      }
    ],
    tests: [
      {
        description: "Should define chart dependencies correctly",
        input: null,
        expected: true
      }
    ],
    realm: "helm",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];