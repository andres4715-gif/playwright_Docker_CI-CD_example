POD_NAME = ubuntu-test-ariosmon2
NAMESPACE = default

.PHONY: help create go_in logs clean restart

help:
	@echo "🛠️  Available commands:"
	@echo "    make create      -> Create a ubuntu pod"
	@echo "    make go_in       -> Go to the ubuntu pod"
	@echo "    make restart     -> Recreate the pod (clean + create)"

create:
	@echo "🧟 Creating pod..."
	kubectl run $(POD_NAME) --image=ubuntu -n $(NAMESPACE) -- sleep infinity
	@echo "⏳ Waiting for pod readiness..."
	kubectl wait --for=condition=Ready pod/$(POD_NAME) -n $(NAMESPACE) --timeout=60s

go_in:
	@echo "🚀 Go into the pod $(POD_NAME)..."
	kubectl exec -it -n $(NAMESPACE) $(POD_NAME) -- /bin/bash

logs:
	@echo "📡 Logs for $(POD_NAME)..."
	kubectl logs $(POD_NAME) -n $(NAMESPACE)

clean:
	@echo "🗑️  Deleting pod..."
	kubectl delete pod $(POD_NAME) -n $(NAMESPACE) --ignore-not-found=true

restart: clean create
	@echo "✅ Pod restarted and ready to use..."