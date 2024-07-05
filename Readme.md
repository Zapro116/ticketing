| cd auth

| docker build -t zapro116/micro-auth .

| docker system prune -a --volumes

| minikube start

| minikube addons enable ingress

| skaffold dev

https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml

kubectl delete -f infra/k8s/

kubectl apply -f infra/k8s/

sudo chmod 666 /var/run/docker.sock

kubectl create secret type_of_secret name_of_secret --from-literal=jwt=secret_you_want

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl get secrets
