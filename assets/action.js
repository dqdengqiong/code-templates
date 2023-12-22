/*
 * @Author: miya.deng
 * @Date: 2023-12-22 16:34:20
 * @Description:
 */

const toggleExband = () => {
	// 假设你的节点有一个特定的类名，例如 'my-node'
	var nodes = document.querySelectorAll(".my-node");

	// 为每个节点添加点击事件
	nodes.forEach(function (node) {
		node.addEventListener("click", function (event) {
			// 获取当前节点的父节点
			var parentNode = node.parentNode;

			// 如果父节点存在
			if (parentNode) {
				// 改变父节点的类
				parentNode.className = "new-class-for-parent";

				// 获取父节点的所有兄弟节点
				var siblingNodes = Array.prototype.filter.call(
					parentNode.parentNode.children,
					function (child) {
						return child !== parentNode;
					}
				);

				// 改变所有兄弟节点的类
				siblingNodes.forEach(function (siblingNode) {
					siblingNode.className = "new-class-for-sibling";
				});
			}

			// 阻止事件冒泡，防止点击事件被父节点捕获
			event.stopPropagation();
		});
	});
};
