// （代码题）使用 js 实现有序数组原地去重

// 原地去重有序数组，也就是在不创建新数组的情况下修改原始数组。
// 示例 :
// 输入: [1, 2, 2, 3, 4, 4, 5, 6, 6, 6]
// 输出: [1, 2, 3, 4, 5, 6]

// 快慢指针

// 可以使用双指针的方法，slow代表慢指针，fast代表快指针

// 我们从数组的第二个元素开始遍历，将其与慢指针指向的元素进行比较，如果不相等，就代表这是一个新的不重复元素，就将慢指针向后移动一位，并将这个新的不重复元素放进该位置。反之就跳过该元素，继续向后遍历

// 最后，返回的慢指针加1，就是去重后的数组长度

let list = [1, 2, 2, 3, 4, 4, 5, 6, 6, 6]
function removeDuplicates(list){
  if(list.length === 0) {
    return 0
  }

  let slow = 0;
  for(let fast = 1; fast < list.length; fast++) {
    if(list[slow] !== list[fast]) {
      slow++;
      list[slow] = list[fast]
    }
  }
  
  return slow + 1
}

var length = removeDuplicates(list)

list.slice(0, length)