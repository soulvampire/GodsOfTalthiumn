var state_machine_entity =  function()
{
  function intialize_states() {
    this.list_of_states = [];
  }

  function intializse_start_state (intial_state) 
  {
    var current_state = null;
    var previous_state;

    if ((this.list_of_states.length) === 0) 
    {
      this.list_of_states[0] = intial_state;
      if (current_state === null)
      {
        current_state = this.list_of_states[0];
        previous_state = null;
      }
    }
  };

  function states_create_state (new_state)
  {
    if(this.duplicte_state_item(new_state))
      console.log("state already exist in state list");
    else
    this.list_of_states.push(new_state);
  };

  function states_remove_state(remove_state_item)
  {
    if ((this.list_of_states.length) === 0) 
    {
      console.log("state list empty ");
      return false;
    }
    else
    {
      if(this.duplicte_state_item(remove_state_item))
      {

      }
    }
  };

  function duplicte_state_item(state_to_compare)
  {
    return this.list_of_states.includes(state_to_compare.toString());
  };
};