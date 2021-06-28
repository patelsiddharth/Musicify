<template>
    <div class="form-group">
        <label class="form-label" :for="id">{{name}}</label>
        <textarea 
            v-if="textarea === 'true'"
            class="form-input"
            :class="className"
            :id="id" 
            :required="required"
            :autocomplete="autocomplete"
            :value="value"
            :maxlength="maxlength"
            :v-model="model"
            @blur="HandleBlur"
            @focus="HandleFocus"
        >
        </textarea>
        <input 
            v-else 
            :class="className"
            class="form-input"
            :type="type" 
            :id="id" 
            :required="required"
            :autocomplete="autocomplete"
            :value="value"
            :v-model="model"
            @blur="HandleBlur"
            @focus="HandleFocus"    
        />
    </div>
</template>

<script>
export default {
    props : [ 'className', 'name', 'id', 'value', 'type', 'model', 'required', 'autocomplete', 'textarea', 'maxlength'],
    setup()
    {
        const HandleFocus = (e) => {
            e.target.parentElement.classList.add('focused')
        }

        const HandleBlur = (e) => {
            const inputElement = e.target;
            if(inputElement.value == "")
            {
                inputElement.classList.remove('filled');
                inputElement.parentElement.classList.remove('focused')
            }
            else
            {
                inputElement.classList.add('filled');
            }
        }

        return { HandleFocus, HandleBlur}
    }
}
</script>

<style>
.form-group 
{
    position:relative;  
    margin-top: 30px;
}

.form-label 
{
  position: absolute;
  left: 0;
  top: 4px;
  color: #999;
  background-color: #fff;
  z-index: 10;
  transition: transform 150ms ease-out, font-size 150ms ease-out;
}

.focused .form-label {
  transform: translateY(-125%);
  font-size: .75em;
}

.form-input 
{
  position: relative;
  padding: 12px 0px 5px 0;
  width: 100%;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 0 0 #e5e5e5;
  transition: box-shadow 150ms ease-out;
}
.form-input:focus
{
    box-shadow: 0 2px 0 0 blue;
}

.form-input.filled 
{
  box-shadow: 0 2px 0 0 lightgreen;
}

</style>