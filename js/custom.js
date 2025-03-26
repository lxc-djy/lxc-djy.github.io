// 监听页面加载完成事件
document.addEventListener('DOMContentLoaded', function() {
  // 创建删除按钮
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️ 删除评论';
  deleteBtn.style.cssText = `
    margin: 10px 0;
    padding: 6px 12px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  // 添加到评论容器
  const commentContainer = document.querySelector('#vcomments');
  if (commentContainer) {
    commentContainer.insertBefore(deleteBtn, commentContainer.firstChild);
  }

  // 删除功能实现
  deleteBtn.onclick = async function() {
    const commentId = prompt('请输入要删除的评论 ID:');
    if (!commentId) return;

    try {
      const response = await fetch(`https://zv73fhfe.lc-cn-n1-shared.com/1.1/classes/Comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          'X-LC-Id': 'zv73FhFeqEEiPGPFjEuJz27p-gzGzoHsz',
          'X-LC-Key': 'UMaANkwzenU5uZkxQe5LLCyW',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('评论删除成功！页面即将刷新...');
        setTimeout(() => location.reload(), 1500);
      } else {
        const error = await response.json();
        throw new Error(error.error || '删除失败');
      }
    } catch (error) {
      alert('操作失败: ' + error.message);
    }
  };
});